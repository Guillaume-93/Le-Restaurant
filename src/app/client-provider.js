// app/client-provider.js
"use client";

import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastProvider } from '@/components/ui/ToastManager';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CookiesBanner from '@/components/ui/CookiesBanner.js';
import NotFound from '@/app/404'; // Import de la page 404

export default function ClientProvider({ children }) {
    const pathname = usePathname();
    const [is404, setIs404] = useState(false);

    useEffect(() => {
        // Vérifie si la page courante est une 404 (basé sur le texte affiché dans le titre de l'onglet)
        if (document.title.includes("404")) {
            setIs404(true);
        } else {
            setIs404(false);
        }
    }, [pathname]);

    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('/auth');

    if (is404) {
        // Si is404 est vrai, afficher la page 404
        return <NotFound />;
    }

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
