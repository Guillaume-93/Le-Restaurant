// app/client-provider.js
"use client";

import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastProvider } from '@/components/ui/ToastManager';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import CookiesBanner from '@/components/ui/CookiesBanner.js';

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
            <ToastProvider />
            <CookiesBanner />
        </SessionProvider>
    );
}
