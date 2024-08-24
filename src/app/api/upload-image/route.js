// app/api/upload-image/route.js

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log("Token retrieved:", token);

    if (!token) {
        console.error("No token found. Unauthorized access attempt.");
        return NextResponse.json({ message: "Unauthorized - No token" }, { status: 401 });
    }

    if (token.role !== 'admin') {
        console.error(`Unauthorized access attempt by user with role: ${token.role}`);
        return NextResponse.json({ message: "Unauthorized - Insufficient role" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const section = formData.get('section');
        const index = parseInt(formData.get('index'), 10);
        const file = formData.get('image');

        console.log("Form Data Received:", { section, index, file });

        if (!file) {
            console.error("No file received");
            return NextResponse.json({ message: "Aucun fichier reçu" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = file.name || `image-${index}-${Date.now()}`;
        const storageRef = ref(storage, `${section}/image-${index}-${fileName}`);
        console.log("Firebase Storage Reference Path:", storageRef.toString());

        console.log("Uploading image to storage with fileName:", fileName);

        const snapshot = await uploadBytes(storageRef, buffer, { contentType: file.type });
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("Image uploaded successfully. Download URL:", downloadURL);

        const documentRef = doc(db, "menuData", "menus");
        const docSnap = await getDoc(documentRef);

        if (!docSnap.exists()) {
            console.error("Document not found");
            return NextResponse.json({ message: "Document non trouvé" }, { status: 404 });
        }

        const currentData = docSnap.data();
        console.log("Current data from Firestore:", currentData);

        if (section === 'heroSection') {
            const heroSection = currentData.heroSection || { images: [] };
            while (heroSection.images.length <= index) {
                heroSection.images.push({});
            }
            heroSection.images[index].src = downloadURL;
            await updateDoc(documentRef, { heroSection });
        } else {
            const sectionData = currentData[section] || [];
            while (sectionData.length <= index) {
                sectionData.push({});
            }
            sectionData[index].imageUrl = downloadURL;
            await updateDoc(documentRef, { [section]: sectionData });
        }

        console.log("Document updated successfully");

        return NextResponse.json({ imageUrl: downloadURL }, { status: 200 });
    } catch (error) {
        console.error("Error during image upload", error);
        return NextResponse.json({ message: "Erreur lors du téléchargement de l'image" }, { status: 500 });
    }
}
