// app/api/menu-data/[id]/route.js
import { getToken } from 'next-auth/jwt';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

const pageMap = {
    'gestion-accueil': 'heroSection',
    'gestion-desserts': 'dessertsMenu',
    'gestion-menus': 'menusPrices',
    'gestion-plats': 'menuCarte',
    'gestion-vins': 'wineMenu',
};

export async function DELETE(req) {
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

        const { pathname } = new URL(req.url);
        const itemId = Number(pathname.split('/').pop());
        // console.log('itemId:', itemId);

        const { searchParams } = new URL(req.url);
        const page = searchParams.get('page');

        if (!itemId || !page || !pageMap[page]) {
            return new Response(JSON.stringify({ message: 'Paramètre de page ou ID invalide ou manquant' }), { status: 400 });
        }

        const documentRef = db.collection('menuData').doc('menus');
        const docSnap = await documentRef.get();

        if (!docSnap.exists) {
            return new Response(JSON.stringify({ message: 'Document non trouvé' }), { status: 404 });
        }

        const data = docSnap.data();
        // console.log('data:', data);

        const updatedSection = data[pageMap[page]].filter(item => item.id !== itemId);
        // console.log('updatedSection:', updatedSection);

        if (updatedSection.length === data[pageMap[page]].length) {
            console.error("L'élément n'a pas été trouvé pour la suppression.");
            return new Response(JSON.stringify({ message: 'Élément non trouvé' }), { status: 404 });
        }

        data[pageMap[page]] = updatedSection;

        await documentRef.set(data, { merge: true });

        return new Response(JSON.stringify({ message: 'Élément supprimé avec succès' }), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'élément:", error);
        return new Response(JSON.stringify({ message: `Erreur interne : ${error.message}` }), { status: 500 });
    }
}
