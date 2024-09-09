"use client";

import { StarSolid } from 'iconoir-react';
import Image from 'next/image';
import Link from 'next/link.js';
import { useEffect, useState } from 'react';

export default function SpecialMenu() {
    const [menuData, setMenuData] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const res = await fetch('/api/menu-data?page=gestion-menu-special');
                if (!res.ok) throw new Error(`Failed to fetch special menu data: ${res.statusText}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setMenuData(data);
                    setImageUrl(data[0]?.imageUrl || '');
                }
            } catch (err) {
                console.error("Error fetching special menu data:", err);
            }
        };
        fetchMenuData();
    }, []);

    if (!menuData[0]?.show) {
        return null;
    }

    const includedFeatures = menuData[0]?.includedFeatures || [];

    return (
        <><div id="special-menu" className=''></div>
        <div className="relative bg-white py-32 sm:py-28">
            {imageUrl && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt="Menu Spécial"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="opacity-40"
                        fill="responsive"
                        loading="lazy" />
                </div>
            )}

            <div className="relative z-10 mx-auto max-w-6xl lg:px-6">
                <div className="mx-auto max-w-xl sm:text-center px-2">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{menuData[0]?.title || 'Menu Spécial'}</h2>
                    <p className="mt-4 text-base leading-7 text-gray-700 font-medium">
                        {menuData[0]?.description || 'Découvrez notre menu spécial pour cette saison!'}
                    </p>
                </div>
                <div className="relative z-10 mx-auto mt-10 max-w-xl rounded-2xl sm:mt-14 lg:mx-0 lg:flex lg:max-w-none gap-x-2">
                    <div className="p-6 sm:p-8 lg:flex-auto bg-white bg-opacity-90 backdrop-blur-md rounded-2xl">
                        <h3 className="text-lg font-semibold tracking-tight text-gray-800">Entrée:</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {menuData[0]?.entree || 'Entrée du jour'}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight text-gray-800 mt-3">Plats:</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {menuData[0]?.plat || 'Plat du jour'}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight text-gray-800 mt-3">Desserts:</h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {menuData[0]?.dessert || 'Dessert du jour'}
                        </p>
                        <div className="mt-8 flex items-center gap-x-2">
                            <div className="h-px flex-auto bg-gray-300" />
                        </div>
                        <ul
                            role="list"
                            className="mt-6 grid grid-cols-1 gap-3 text-sm leading-5 text-gray-600 sm:grid-cols-2 sm:gap-4"
                        >
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-2 items-center">
                                    <StarSolid aria-hidden="true" className="h-4 w-4 flex-none text-[#1c4d57]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0">
                        <div className="rounded-2xl py-8 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-12 bg-white bg-opacity-90 backdrop-blur-md">
                            <div className="mx-auto max-w-xs px-6">
                                <p className="text-sm font-medium text-gray-600">{menuData[0]?.note || 'Payez une seule fois, savourez pour toujours'}</p>
                                <p className="mt-4 flex items-baseline justify-center gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">{menuData[0]?.price || 'Prix'}</span>
                                </p>
                                <Link
                                    href="/contact"
                                    className="mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold bg-[#112E34] text-white hover:bg-[#1c4d57] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Réserver une table
                                </Link>
                                <p className="mt-4 text-xs leading-4 text-gray-600">
                                    {menuData[0]?.footerText || 'Factures et reçus disponibles pour un remboursement facile.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-16 sm:pb-24"></div>
        </div></>
    );
}
