"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Example() {
    return (
        <div className="bg-white">
            <main>
                <div className="relative isolate">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        alt=""
                        src="images/le-neuilly-pattern-3.png"
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
                                        Découvrez notre cuisine raffinée
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="mt-6 text-lg leading-8 text-[--text-color-secondary] sm:max-w-md lg:max-w-none"
                                    >
                                        Découvrez une expérience culinaire unique dans un cadre élégant et
                                        chaleureux. <br/> <span className='font-bold'>Le Neuilly</span> vous propose une cuisine française raffinée,
                                        préparée avec des ingrédients frais et de qualité.
                                    </motion.p>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.4 }} 
                                        className="mt-10 flex items-center gap-x-6"
                                    >
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
                                                alt=""
                                                src="images/dalle-1.webp"
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
                                                alt=""
                                                src="images/menus/plats/sole-meuniere.webp"
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
                                                alt=""
                                                src="images/dalle-4.webp"
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
                                                alt=""
                                                src="images/menus/plats/entrecote.webp"
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
                                                alt=""
                                                src="images/menus/desserts/mousse-au-chocolat.webp"
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
