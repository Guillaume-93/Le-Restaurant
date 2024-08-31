// app/client-provider.js
"use client";

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProvider({ children }) {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('/auth');

    return (
        <SessionProvider>
            {!isAdminRoute && !isAuthRoute && <Header />}
            <main className="flex-grow">{children}</main>
            {!isAdminRoute && !isAuthRoute && <Footer />}
            <ScrollToTop />
            <ToastContainer />
        </SessionProvider>
    );
}
