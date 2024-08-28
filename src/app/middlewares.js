// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from './firebaseAdmin';

const db = getFirestore(adminApp);

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.firebaseUid) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    try {
        // Vérification du rôle de l'utilisateur en temps réel dans Firestore
        const userDocRef = db.collection('users').doc(token.firebaseUid);
        const userDocSnap = await userDocRef.get();

        if (!userDocSnap.exists() || userDocSnap.data().role !== 'admin') {
            // Forcer la déconnexion si l'utilisateur n'est plus admin
            const signOutUrl = new URL('/api/auth/signout', req.url);
            signOutUrl.searchParams.set('callbackUrl', '/unauthorized');
            return NextResponse.redirect(signOutUrl);
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Erreur lors de la vérification du rôle :", error);
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};
