// app/api/upload-image/route.js
import { getStorage } from 'firebase-admin/storage';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { adminDb } from '../../../../firebaseAdmin';

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'admin') {
        return NextResponse.json({ message: 'Accès non autorisé' }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const section = formData.get('section');
        const index = parseInt(formData.get('index'), 10);
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ message: "Aucun fichier reçu" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `image-${index}-${Date.now()}.${file.type.split('/')[1]}`;

        const bucket = getStorage().bucket();
        const fileRef = bucket.file(`${section}/${fileName}`);

        await fileRef.save(buffer, {
            contentType: file.type,
            public: true,
        });

        const downloadURL = `https://storage.googleapis.com/${bucket.name}/${section}/${fileName}`;

        const documentRef = adminDb.collection("menuData").doc("menus");
        const docSnap = await documentRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "Document non trouvé" }, { status: 404 });
        }

        const currentData = docSnap.data();
        if (section === 'heroSection') {
            const heroSection = currentData.heroSection || { images: [] };
            while (heroSection.images.length <= index) {
                heroSection.images.push({});
            }
            heroSection.images[index].src = downloadURL;
            await documentRef.update({ heroSection });
        } else {
            const sectionData = currentData[section] || [];
            while (sectionData.length <= index) {
                sectionData.push({});
            }
            sectionData[index].imageUrl = downloadURL;
            await documentRef.update({ [section]: sectionData });
        }

        return NextResponse.json({ imageUrl: downloadURL }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors du téléchargement de l'image :", error);
        return NextResponse.json({ message: "Erreur lors du téléchargement de l'image" }, { status: 500 });
    }
}
