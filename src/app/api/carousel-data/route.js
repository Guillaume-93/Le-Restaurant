// app/api/carousel-data/route.js
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

export async function GET(req) {
    try {
        const documentRef = db.collection('menuData').doc('carousel');
        const docSnap = await documentRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            return new Response(JSON.stringify(data.carousel), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Document not found" }), { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching carousel data:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
