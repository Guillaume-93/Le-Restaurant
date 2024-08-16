// src/app/layout.js

"use client";

import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.removeAttribute('cz-shortcut-listen');
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Le Neuilly - Restaurant</title>
        <meta name="description" content="Découvrez le restaurant Le Neuilly, une cuisine raffinée au cœur de la ville." />
      </Head>
      <div className={`min-h-screen flex flex-col bg-white`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
