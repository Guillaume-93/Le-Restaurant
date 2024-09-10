import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    // Utilisez useEffect pour vérifier l'état de localStorage après le montage côté client
    useEffect(() => {
        // Vérifiez si localStorage est disponible
        if (typeof window !== 'undefined') {
            const bannerDismissed = localStorage.getItem('cookieBannerDismissed');
            if (!bannerDismissed) {
                setIsBannerVisible(true); // Afficher la bannière si elle n'a pas encore été fermée
            }
        }
    }, []);

    const handleDismiss = () => {
        setIsBannerVisible(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem('cookieBannerDismissed', 'true');
        }
    };

    if (!isBannerVisible) {
        return null; // Ne rien afficher si la bannière est fermée
    }

    return (
        <>
            <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:bottom-1 sm:px-6 sm:pb-2 lg:px-8 max-w-7xl mx-auto z-50">
                <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                    <p className="text-sm leading-6 text-white">
                        <strong className="font-semibold">Ce site utilise des cookies</strong>
                        <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                            <circle r={1} cx={1} cy={1} />
                        </svg>
                        En poursuivant votre navigation, vous acceptez l&apos;utilisation des cookies.&nbsp;
                        <Link href="/politique-de-confidentialite" className="underline hover:text-gray-300">
                            En savoir plus
                        </Link>
                    </p>
                    <button
                        type="button"
                        className="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]"
                        onClick={handleDismiss}
                    >
                        <span className="sr-only">Fermer la bannière</span>
                        <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </>
    );
}
