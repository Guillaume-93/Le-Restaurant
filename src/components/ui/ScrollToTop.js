"use client";

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Pour détecter les changements de route

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname(); // Utilisation de usePathname pour détecter les changements de route

    // Fonction pour afficher/masquer le bouton en fonction du défilement
    const toggleVisibility = () => {
        if (window.scrollY > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Fonction de défilement doux vers le haut
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const scrollToTop = () => {
        const start = window.scrollY;
        const duration = 1500;
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easing = easeInOutQuad(progress);
            window.scrollTo(0, start * (1 - easing));

            if (timeElapsed < duration) {
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    // Forcer le défilement en haut après la navigation
    useEffect(() => {
        window.scrollTo(0, 0); // Revenir en haut après chaque changement de route
    }, [pathname]); // Déclenché à chaque changement de route

    // Gérer la visibilité du bouton de retour en haut
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-4 right-4 z-20">
                    <button
                        onClick={scrollToTop}
                        className="p-2 rounded-full bg-[--link-color-background] text-white shadow-lg hover:bg-[--link-color-hover]"
                        aria-label="Scroll to top"
                    >
                        <ArrowUpIcon className="h-6 w-6" />
                    </button>
                </div>
            )}
        </>
    );
}
