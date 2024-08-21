import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../firebase";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 jours
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                const credential = GoogleAuthProvider.credential(account.id_token);
                try {
                    // Authentification auprès de Firebase
                    const userCredential = await signInWithCredential(auth, credential);
                    token.firebaseUid = userCredential.user.uid; // Récupère l'UID Firebase
                } catch (error) {
                    console.error("Erreur d'authentification Firebase:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.firebaseUid = token.firebaseUid; // Ajoute l'UID Firebase à la session
            return session;
        },
    },
    debug: true,
});
