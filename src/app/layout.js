// app/layout.js
import ClientProvider from './client-provider';
import "./globals.css";

export const metadata = {
  title: 'Le Neuilly',
  description: 'Le Neuilly vous propose une cuisine française raffinée, préparée avec des ingrédients frais et de qualité.',
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png'
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
