import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../../firebase.js"; 

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

                    // Vérification de l'utilisateur dans Firestore
                    const userDocRef = doc(db, "users", firebaseUid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const role = userDocSnap.data().role;
                        if (role === 'admin') {
                            token.firebaseUid = firebaseUid;
                            token.role = role;
                            console.log("User is admin, session will be created");
                        } else {
                            console.error("Unauthorized - Insufficient role", role);
                            return false; 
                        }
                    } else {
                        console.error("Unauthorized - User not found in Firestore");
                        return false; 
                    }
                } catch (error) {
                    console.error("Firebase authentication error:", error);
                    return false;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (!token || token.role !== 'admin') {
                console.log("Session not created for non-admin user");
                return null; 
            }
            session.user.firebaseUid = token.firebaseUid;
            session.user.role = token.role;
            return session;
        },
        async redirect({ url, baseUrl, token }) {
            if (token?.role === 'unauthorized') {
                return `${baseUrl}/unauthorized`;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    debug: true, 
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
