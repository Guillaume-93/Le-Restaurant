// src/pages/_app.js

import { SessionProvider } from "next-auth/react";
import Layout from "../app/layout.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../app/globals.css";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();
    const showHeader = router.pathname !== "/admin";
    const showFooter = router.pathname !== "/admin";

    return (
        <SessionProvider session={session}>
            <Layout>
                {showHeader && <Header />}
                <ToastContainer />
                <Component {...pageProps} />
                {showFooter && <Footer />}
            </Layout>
        </SessionProvider>
    );
}
