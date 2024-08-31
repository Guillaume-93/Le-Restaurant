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
            const data = docSnap.data()[pageMap[page]] || [];
            // Si la page est gestion-menus, ajouter les champs spécifiques
            if (page === 'gestion-menus') {
                data.forEach(menu => {
                    menu.platDuJour = menu.platDuJour || '';
                    menu.poissonDuJour = menu.poissonDuJour || '';
                    menu.accompagnements = menu.accompagnements || '';
                    menu.desserts = menu.desserts || '';
                });
            }
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

    if (!token || !token.firebaseUid) {
        return new Response(JSON.stringify({ message: 'Accès interdit' }), { status: 403 });
    }

    try {
        const userDocRef = db.collection('users').doc(token.firebaseUid);
        const userDocSnap = await userDocRef.get();

        if (!userDocSnap.exists || userDocSnap.data().role !== 'admin') {
            return new Response(JSON.stringify({ message: 'Accès interdit : rôle non autorisé' }), { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page');

        if (!page || !pageMap[page]) {
            return new Response(JSON.stringify({ message: "Paramètre de page invalide ou manquant" }), { status: 400 });
        }

        const updatedData = await req.json();

        // Validation et formatage des données pour gestion-menus
        if (page === 'gestion-menus') {
            updatedData.forEach(menu => {
                menu.platDuJour = menu.platDuJour || '';
                menu.poissonDuJour = menu.poissonDuJour || '';
                menu.accompagnements = menu.accompagnements || '';
                menu.desserts = menu.desserts || '';
            });
        }

        const documentRef = db.collection('menuData').doc('menus');
        await documentRef.set(
            { [pageMap[page]]: updatedData },
            { merge: true }
        );

        return new Response(JSON.stringify({ message: "Données mises à jour avec succès" }), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
        return new Response(JSON.stringify({ message: `Erreur interne : ${error.message}` }), { status: 500 });
    }
}
