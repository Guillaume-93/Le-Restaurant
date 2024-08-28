// app/api/admin-data/route.js

import { getToken } from 'next-auth/jwt';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

export async function GET(req) {
    try {
        console.log("[API /menu-data] GET request received.");
        const documentRef = db.collection("menuData").doc("menus");
        const docSnap = await documentRef.get();

        if (docSnap.exists()) {
            console.log("[API /menu-data] Document found:", docSnap.data());
            return new Response(JSON.stringify(docSnap.data()), { status: 200 });
        } else {
            console.log("[API /menu-data] Document not found.");
            return new Response(JSON.stringify({ message: "Document non trouvé" }), { status: 404 });
        }
    } catch (error) {
        console.error("[API /menu-data] Error handling request:", error);
        return new Response(JSON.stringify({ message: `Internal Server Error: ${error.message}` }), { status: 500 });
    }
}

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.firebaseUid) {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    try {
        const userDocRef = db.collection('users').doc(token.firebaseUid);
        const userDocSnap = await userDocRef.get();

        if (!userDocSnap.exists || userDocSnap.data().role !== 'admin') {
            return new Response(JSON.stringify({ message: 'Accès interdit : rôle non autorisé' }), { status: 403 });
        }

        const documentRef = db.collection("menuData").doc("menus");
        const updatedData = await req.json();
        await documentRef.set(updatedData, { merge: true });
        return new Response(JSON.stringify({ message: "Données mises à jour avec succès" }), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
        return new Response(JSON.stringify({ message: "Erreur interne" }), { status: 500 });
    }
}
