"use client";

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Si le chemin commence par "/admin", n'utilisez pas Header et Footer
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth');

  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white">
        <SessionProvider>
          {!isAdminRoute && !isAuthRoute && <Header />}
          <main className="flex-grow">{children}</main>
          {!isAdminRoute && !isAuthRoute && <Footer />}
          <ScrollToTop />
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
