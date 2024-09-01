"use client";

import { useState, useEffect } from 'react';
import Loader from '@/components/Loader/LoaderFull.js';
import Image from 'next/image.js';
import MenuPrices from '@/components/homepage/MenusPrices.js';
import SpecialMenu from '@/components/homepage/SpecialMenu.js';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Menu() {
    const [loading, setLoading] = useState(true);
    const [menuData, setMenuData] = useState(null);
    const [error, setError] = useState(null);

    const fetchMenuData = async (page) => {
        try {
            const response = await fetch(`/api/menu-data?page=${page}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch menu data for ${page}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error loading ${page} data:`, error);
            setError(`Failed to load ${page} data.`);
            return null;
        }
    };

    useEffect(() => {
        const loadData = async () => {
            const menusPricesData = await fetchMenuData('gestion-menus');
            const menuCarteData = await fetchMenuData('gestion-plats');
            const dessertsMenuData = await fetchMenuData('gestion-desserts');
            const wineMenuData = await fetchMenuData('gestion-vins');

            if (menusPricesData && menuCarteData && dessertsMenuData && wineMenuData) {
                setMenuData({
                    menusPrices: menusPricesData,
                    menuCarte: menuCarteData,
                    dessertsMenu: dessertsMenuData,
                    wineMenu: wineMenuData,
                });
                setLoading(false);
            } else {
                setError('Failed to load some menu data.');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!menuData) {
        return <div>No menu data available</div>;
    }

    return (
        <>
            {/* Menus Prices */}
            <MenuPrices />

            {/* Menu Spécial */}
            <SpecialMenu />

            {/* Menu à la Carte */}
            <div id="a-la-carte" className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">À la Carte</h2>
                        <p className="mt-2 text-lg leading-8 text-slate-600">
                            Explorez nos plats à la carte, soigneusement sélectionnés pour satisfaire toutes vos envies culinaires.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {menuData.menuCarte && menuData.menuCarte.map((post) => (
                            <article key={post.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        alt={post.title || 'alt indisponible'}
                                        src={post.imageUrl}
                                        className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{post.price}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desserts */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Desserts</h2>
                        <p className="mt-2 text-lg leading-8 text-slate-600">
                            Terminez votre repas en beauté avec nos desserts faits maison.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {menuData.dessertsMenu && menuData.dessertsMenu.map((dessert) => (
                            <article key={dessert.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        alt={dessert.title || 'alt indisponible'}
                                        src={dessert.imageUrl}
                                        className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900">
                                            <span className="absolute inset-0" />
                                            {dessert.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{dessert.description}</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{dessert.price}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            {/* Carte des Vins */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Carte des Vins</h2>
                        <p className="mt-2 text-lg leading-8 text-slate-600">
                            Découvrez notre sélection de vins soigneusement choisis pour accompagner vos plats.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {menuData.wineMenu && menuData.wineMenu.map((wine) => (
                            <article key={wine.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        alt={wine.title || 'alt indisponible'}
                                        src={wine.imageUrl}
                                        className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900">
                                            <span className="absolute inset-0" />
                                            {wine.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{wine.description}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">Millésime : {wine.year}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">Volume : {wine.volume}</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{wine.price}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
