"use client";

import { useEffect } from 'react';
import { Inter } from "next/font/google";
import Head from 'next/head';
import Header from '../components/HeaderBis';
import Footer from '../components/Footer';
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
      </div>
    </>
  );
}
