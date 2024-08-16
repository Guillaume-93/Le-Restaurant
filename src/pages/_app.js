// pages/_app.js

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../app/globals.css";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <ToastContainer />
            <Component {...pageProps} />
        </SessionProvider>
    );
}
