"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Loader from '../Loader/Loader.js';

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
        <div className="bg-white">
            <main>
                <div className="relative isolate">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        alt={heroData.images[0]?.alt || 'Hero image'}
                        src={heroData.images[0]?.src}
                        className="absolute inset-0 -z-10 h-full w-full object-cover"
                    />
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <motion.h1
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl"
                                    >
                                        {heroData.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mt-6 text-lg leading-8 text-[--text-color-secondary] sm:max-w-md lg:max-w-none"
                                    >
                                        {heroData.subtitle}
                                    </motion.p>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.4 }} 
                                        className="mt-10 flex items-center gap-x-6"
                                    >
                                        <Link
                                            href={heroData.buttonLink1}
                                            className="rounded-md bg-[--link-color-background] px-4 py-3 text-center text-sm font-semibold text-[--link-color-text] shadow-default transition-all duration-200 hover:bg-[--link-color-hover] active:scale-95 active:shadow-inner"
                                        >
                                            {heroData.buttonText1}
                                        </Link>
                                        <Link
                                            href={heroData.buttonLink2}
                                            className="after:transition-width relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 after:w-0 after:bg-slate-900 after:duration-300 hover:after:w-full"
                                        >
                                            {heroData.buttonText2} <span aria-hidden="true">→</span>
                                        </Link>
                                    </motion.div>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                            className="relative"
                                        >
                                            <img
                                                alt={heroData.images[1]?.alt || 'Hero image'}
                                                src={heroData.images[1]?.src}
                                                className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-default"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </motion.div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.8 }}
                                            className="relative"
                                        >
                                            <img
                                                alt={heroData.images[2]?.alt || 'Hero image'}
                                                src={heroData.images[2]?.src}
                                                className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-default"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 1 }}
                                            className="relative"
                                        >
                                            <img
                                                alt={heroData.images[3]?.alt || 'Hero image'}
                                                src={heroData.images[3]?.src}
                                                className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-default"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </motion.div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 1.2 }}
                                            className="relative"
                                        >
                                            <img
                                                alt={heroData.images[4]?.alt || 'Hero image'}
                                                src={heroData.images[4]?.src}
                                                className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-default"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 1.4 }}
                                            className="relative"
                                        >
                                            <img
                                                alt={heroData.images[5]?.alt || 'Hero image'}
                                                src={heroData.images[5]?.src}
                                                className="aspect-[2/3] w-full rounded-xl bg-slate-900/5 object-cover shadow-default"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/10" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
