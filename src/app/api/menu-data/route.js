// app/api/menu-data/route.js

import { getToken } from 'next-auth/jwt';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(req) {
    try {
        const documentRef = doc(db, "menuData", "menus");
        const docSnap = await getDoc(documentRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return new Response(JSON.stringify(data), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "Document non trouvé" }), { status: 404 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    try {
        const documentRef = doc(db, "menuData", "menus");
        const updatedData = await req.json();
        await setDoc(documentRef, updatedData);
        return new Response(JSON.stringify({ message: "Data updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
