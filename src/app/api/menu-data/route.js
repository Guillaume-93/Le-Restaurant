// app/api/menu-data/route.js
import { getToken } from 'next-auth/jwt';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

const pageMap = {
    'gestion-accueil': 'heroSection',
    'gestion-desserts': 'dessertsMenu',
    'gestion-menus': 'menusPrices',
    'gestion-plats': 'menuCarte',
    'gestion-vins': 'wineMenu',
};

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');

    if (!page || !pageMap[page]) {
        return new Response(JSON.stringify({ message: "Page parameter is invalid or missing" }), { status: 400 });
    }

    try {
        const documentRef = db.collection('menuData').doc('menus');
        const docSnap = await documentRef.get();

        if (docSnap.exists) {
            const data = docSnap.data()[pageMap[page]] || {};
            return new Response(JSON.stringify(data), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: `Document not found for page: ${page}` }), { status: 404 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ message: `Internal Server Error: ${error.message}` }), { status: 500 });
    }
}

export async function POST(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || token.role !== 'admin') {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');

    if (!page || !pageMap[page]) {
        return new Response(JSON.stringify({ message: "Page parameter is invalid or missing" }), { status: 400 });
    }

    try {
        const documentRef = db.collection('menuData').doc('menus');
        const updatedData = await req.json();

        await documentRef.set(
            { [pageMap[page]]: updatedData }, 
            { merge: true }
        );

        return new Response(JSON.stringify({ message: "Data updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ message: `Internal Server Error: ${error.message}` }), { status: 500 });
    }
}
