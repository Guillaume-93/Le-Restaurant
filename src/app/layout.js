"use client";

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth');

  return (
    <html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <title>Mon Application</title>
      </Head>
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
