"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/components/Loader/LoaderFull.js';
import Image from 'next/image.js';

export default function HeroSection() {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHeroData() {
            try {
                const response = await fetch('/api/menu-data?page=gestion-accueil', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch hero data');
                }

                const data = await response.json();
                setHeroData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading hero data:', error);
                setError('Error loading hero data.');
                setLoading(false);
            }
        }

        fetchHeroData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!heroData || !Array.isArray(heroData.images)) {
        return <div>Error loading hero data.</div>;
    }

    return (
            <main className="min-h-screen bg-gradient-to-br from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)]">
                <div className="relative isolate">
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pt-32 lg:px-8 lg:pt-12">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                                        {heroData.title}
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-[--text-color-secondary] sm:max-w-md lg:max-w-none">
                                        {heroData.subtitle}
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <Link
                                            href="/contact"
                                            className="rounded-md bg-[--link-color-background] px-4 py-3 text-center text-sm font-semibold text-[--link-color-text] shadow-default transition-all duration-200 hover:bg-[--link-color-hover] active:scale-95 active:shadow-inner"
                                        >
                                            Réserver une table
                                        </Link>
                                        <Link
                                            href="/menu"
                                            className="after:transition-width relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 after:w-0 after:bg-slate-900 after:duration-300 hover:after:w-full"
                                        >
                                            Voir le menu <span aria-hidden="true">→</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <Image
                                                alt={heroData.images[0]?.alt || 'Hero image'}
                                                src={heroData.images[0]?.src}
                                                className="aspect-[2/3] rounded-xl bg-slate-900/5 object-cover shadow-default"
                                                width={300}
                                                height={450}
                                                priority={true}
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <Image
                                                alt={heroData.images[1]?.alt || 'Hero image'}
                                                src={heroData.images[1]?.src}
                                                className="aspect-[2/3] rounded-xl bg-slate-900/5 object-cover shadow-default"
                                                width={300}
                                                height={450}
                                                priority={true}
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </div>
                                        <div className="relative">
                                            <Image
                                                alt={heroData.images[2]?.alt || 'Hero image'}
                                                src={heroData.images[2]?.src}
                                                className="aspect-[2/3] rounded-xl bg-slate-900/5 object-cover shadow-default"
                                                width={300}
                                                height={450}
                                                priority={true}
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <Image
                                                alt={heroData.images[3]?.alt || 'Hero image'}
                                                src={heroData.images[3]?.src}
                                                className="aspect-[2/3] rounded-xl bg-slate-900/5 object-cover shadow-default"
                                                width={300}
                                                height={450}
                                                priority={true}
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </div>
                                        <div className="relative">
                                            <Image
                                                alt={heroData.images[4]?.alt || 'Hero image'}
                                                src={heroData.images[4]?.src}
                                                className="aspect-[2/3] rounded-xl bg-slate-900/5 object-cover shadow-default"
                                                width={300}
                                                height={450}
                                                priority={true}
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    );
}
