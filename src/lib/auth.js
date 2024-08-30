// src/lib/auth.js
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.js';
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from 'next-auth';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                const credential = GoogleAuthProvider.credential(account.id_token);
                try {
                    const userCredential = await signInWithCredential(auth, credential);
                    const firebaseUid = userCredential.user.uid;
                    // console.log("[authOptions] Firebase UID récupéré :", firebaseUid);

                    const userDocRef = doc(db, "users", firebaseUid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        token.firebaseUid = firebaseUid;
                        token.role = userDocSnap.data().role || 'user';
                        // console.log("[authOptions] Rôle utilisateur assigné :", token.role);
                    } else {
                        console.error("[authOptions] Document utilisateur non trouvé dans Firestore");
                        return false;
                    }
                } catch (error) {
                    console.error("[authOptions] Erreur lors de l'authentification Firebase :", error);
                    return false;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.firebaseUid = token.firebaseUid;
            session.user.role = token.role;
            // console.log("[authOptions] Session utilisateur configurée :", session.user);
            return session;
        },
    },
    pages: {
        signIn: '/unauthorized',
        error: '/unauthorized',
    },
    debug: true,
};

export const getAuthSession = async (context) => {
    // console.log("[getAuthSession] Récupération de la session utilisateur...");
    return await getServerSession(context, authOptions);
};

export const isAuthenticated = async (context) => {
    const session = await getAuthSession(context);
    // console.log("[isAuthenticated] Vérification de l'authentification. Rôle :", session?.user?.role);
    return session && session.user && session.user.role === 'admin';
};
