// app/api/upload-carousel-image/route.js
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { adminApp } from '../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized access. Admin rights required.' }, { status: 403 });
    }

    try {
        const formData = await req.formData();
        const index = parseInt(formData.get('index'), 10);
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ message: "Error: No file received." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `carousel-image-${index}-${Date.now()}.${file.type.split('/')[1]}`;

        const bucket = getStorage(adminApp).bucket();
        const fileRef = bucket.file(`carousel/${fileName}`);

        await fileRef.save(buffer, {
            contentType: file.type,
            public: true,
        });

        const downloadURL = `https://storage.googleapis.com/${bucket.name}/carousel/${fileName}`;

        const documentRef = db.collection('menuData').doc('carousel');
        const docSnap = await documentRef.get();

        if (docSnap.exists) {
            const carouselData = docSnap.data().carousel || [];
            carouselData[index].imageUrl1 = downloadURL;

            await documentRef.update({ carousel: carouselData });
        }

        return NextResponse.json({ imageUrl: downloadURL, message: "Image uploaded and updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
