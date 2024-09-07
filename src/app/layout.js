// app/layout.js
import ClientProvider from './client-provider';
import "./globals.css";

export const metadata = {
  title: 'Le Neuilly - Cuisine Française Raffinée',
  description: 'Le Neuilly vous propose une cuisine française raffinée, préparée avec des ingrédients frais et de qualité. Découvrez nos menus de saison, vins et desserts.',
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  canonical: 'https://le-neuilly.netlify.app/', // URL de votre site
  metadataBase: new URL('https://le-neuilly.netlify.app'), // URL de base pour les métadonnées

  openGraph: {
    title: 'Le Neuilly - Cuisine Française Raffinée',
    description: 'Le Neuilly vous propose une cuisine française raffinée, préparée avec des ingrédients frais et de qualité.',
    url: 'https://le-neuilly.netlify.app/', // URL de votre site
    type: 'website',
    images: [
      {
        url: '/images/restaurant.jpg', // Image utilisée pour les aperçus
        width: 800,
        height: 600,
        alt: 'Le Neuilly - Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Neuilly - Cuisine Française Raffinée',
    description: 'Découvrez la meilleure cuisine française au restaurant Le Neuilly.',
    image: '/images/Screenshot-2024-09-06-085145.webp',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
