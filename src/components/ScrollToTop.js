"use client";

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

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
                    {isVisible && (
                        <button
                            onClick={scrollToTop}
                            className="p-2 rounded-full bg-[--link-color-background] text-white shadow-lg hover:bg-[--link-color-hover]"
                            aria-label="Scroll to top"
                        >
                            <ArrowUpIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
