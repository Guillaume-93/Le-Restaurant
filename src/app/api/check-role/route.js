// app/api/check-role/route.js
import { getToken } from 'next-auth/jwt';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '../../../../firebaseAdmin.js';

const db = getFirestore(adminApp);

export async function GET(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.firebaseUid) {
            return new Response(JSON.stringify({ message: 'Non autorisé' }), { status: 403 });
        }

        const userDocRef = db.collection('users').doc(token.firebaseUid);
        const userDocSnap = await userDocRef.get();

        if (!userDocSnap.exists || userDocSnap.data().role !== 'admin') {
            return new Response(JSON.stringify({ message: 'Rôle non autorisé' }), { status: 403 });
        }

        return new Response(JSON.stringify({ message: 'Autorisé' }), { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error);
        return new Response(JSON.stringify({ message: 'Erreur interne' }), { status: 500 });
    }
}
