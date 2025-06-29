// app/api/upload-image/route.js
import { getStorage } from 'firebase-admin/storage';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { adminDb } from '../../../../firebaseAdmin';

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'admin') {
        return NextResponse.json({ message: 'Accès non autorisé. Vous devez être administrateur pour effectuer cette action.' }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const section = formData.get('section');
        const indexOrKey = formData.get('index');
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ message: "Erreur : Aucun fichier reçu. Veuillez sélectionner une image à télécharger." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `image-${indexOrKey}-${Date.now()}.${file.type.split('/')[1]}`;

        const bucket = getStorage().bucket();
        const fileRef = bucket.file(`${section}/${fileName}`);

        try {
            await fileRef.save(buffer, {
                contentType: file.type,
                public: true,
            });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde de l'image dans le stockage :", error);
            return NextResponse.json({ message: "Erreur lors du téléchargement de l'image. Veuillez réessayer plus tard." }, { status: 500 });
        }

        const downloadURL = `https://storage.googleapis.com/${bucket.name}/${section}/${fileName}`;

        const documentRef = adminDb.collection("menuData").doc("menus");
        const docSnap = await documentRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ message: "Erreur : Le document de données du menu n'a pas été trouvé." }, { status: 404 });
        }

        const currentData = docSnap.data();
        if (section === 'heroSection') {
            const heroSection = currentData.heroSection || { images: [], backgroundImage: {} };
            if (indexOrKey === 'background') {
                heroSection.backgroundImage = { ...heroSection.backgroundImage, src: downloadURL };
            } else {
                const index = parseInt(indexOrKey, 10);
                if (isNaN(index)) {
                    return NextResponse.json({ message: "Index invalide pour l'image." }, { status: 400 });
                }
                while (heroSection.images.length <= index) {
                    heroSection.images.push({});
                }
                heroSection.images[index].src = downloadURL;
            }
            try {
                await documentRef.update({ heroSection });
            } catch (error) {
                console.error("Erreur lors de la mise à jour du document heroSection :", error);
                return NextResponse.json({ message: "Erreur lors de la mise à jour des données de la section Hero. Veuillez réessayer." }, { status: 500 });
            }
        } else {
            const index = parseInt(indexOrKey, 10);
             if (isNaN(index)) {
                return NextResponse.json({ message: "Index invalide pour l'image." }, { status: 400 });
            }
            const sectionData = currentData[section] || [];
            while (sectionData.length <= index) {
                sectionData.push({});
            }
            sectionData[index].imageUrl = downloadURL;
            try {
                await documentRef.update({ [section]: sectionData });
            } catch (error) {
                console.error("Erreur lors de la mise à jour du document de la section :", error);
                return NextResponse.json({ message: `Erreur lors de la mise à jour des données pour la section ${section}. Veuillez réessayer.` }, { status: 500 });
            }
        }

        return NextResponse.json({ imageUrl: downloadURL, message: "Image téléchargée et données mises à jour avec succès !" }, { status: 200 });
    } catch (error) {
        console.error("Erreur générale lors du téléchargement de l'image :", error);
        return NextResponse.json({ message: "Erreur lors du téléchargement de l'image. Veuillez réessayer plus tard." }, { status: 500 });
    }
}
