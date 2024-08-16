// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
// console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

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
        async jwt({ token, user, account }) {
            if (account && user) {
                token.id = user.id;
            }
            // console.log("JWT callback with token: ", token);
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            // console.log("Session callback: ", session);
            return session;
        },
    },
    debug: true,
});
