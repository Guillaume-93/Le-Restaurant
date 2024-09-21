"use client";

import Banners from '@/components/homepage/Banners';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Navigation menu
const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
];

// Function to manage classNames
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const pathname = usePathname(); // Get current path
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const [showBanner, setShowBanner] = useState(false); // State for displaying the banner
    const [menuTitle, setMenuTitle] = useState('');
    const [menuPrice, setMenuPrice] = useState('');

    // Fetch special menu data
    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const res = await fetch('/api/menu-data?page=gestion-menu-special');
                if (!res.ok) throw new Error(`Failed to fetch special menu data: ${res.statusText}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0 && data[0]?.show) {
                    setShowBanner(true);
                    setMenuTitle(data[0]?.title);
                    setMenuPrice(data[0]?.price);
                } else {
                    setShowBanner(false);
                }
            } catch (err) {
                console.error("Error fetching special menu data:", err);
                setShowBanner(false);
            }
        };
        fetchMenuData();
    }, []);

    return (
        <header className="sticky inset-x-0 top-0 z-50 shadow-md bg-[#111827] py-2">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <span className="sr-only">Le Neuilly</span>
                        <Image
                            alt="Image représentant le logo du restaurant Le Neuilly"
                            src="/images/logos/le-restaurant.png"
                            className="h-8 w-auto rounded-lg"
                            width={200}
                            height={100}
                            priority
                        />
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={classNames(
                                pathname === item.href
                                    ? 'after:w-full text-slate-100'
                                    : 'after:w-0 text-slate-100 hover:text-gray-100',
                                'relative text-sm font-semibold leading-6 py-0.5 after:block after:h-0.5 after:bg-gray-100'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {!isLoading && session && session.user.role === 'admin' && (
                        <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className={classNames(
                                pathname === '/admin'
                                    ? 'after:w-full text-slate-100 bg-indigo-600'
                                    : 'after:w-0 text-slate-100 bg-indigo-600 hover:bg-indigo-500',
                                'relative text-sm font-semibold leading-6 px-3 py-0.5 rounded-full after:block after:h-0.5 after:bg-indigo-600'
                            )}
                        >
                            Tableau de bord
                        </Link>
                    )}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-4">
                    {!isLoading && session && (
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="text-sm font-semibold leading-6 py-0.5 text-red-600 hover:text-red-500"
                        >
                            Déconnexion <span aria-hidden="true">&rarr;</span>
                        </button>
                    )}
                </div>
                <div className="flex lg:hidden justify-end flex-1">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Le Neuilly</span>
                            <Image
                                alt="Le Neuilly"
                                src="/images/logos/le-restaurant-black.png"
                                className="sm:hidden h-8 w-auto rounded-lg"
                                width={100}
                                height={100}
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="flex flex-col space-y-2 py-10 px-2 items-center">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'after:w-full text-slate-900'
                                            : 'after:w-0 text-slate-900 hover:text-gray-900',
                                        'relative text-sm font-semibold leading-6 py-0.5 after:block after:h-0.5 after:bg-gray-900 text-center inline-block mx-auto transition-all duration-300'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {!isLoading && session && session.user.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={classNames(
                                        pathname === '/admin'
                                            ? 'after:w-full text-slate-100 bg-indigo-600'
                                            : 'after:w-0 text-slate-100 bg-indigo-600 hover:bg-indigo-500',
                                        'relative text-sm font-semibold leading-6 px-3 py-0.5 rounded-full after:block after:h-0.5 after:bg-indigo-600 text-center inline-block mx-auto transition-all duration-300'
                                    )}
                                >
                                    Tableau de bord
                                </Link>
                            )}
                        </div>
                        <div className="flex flex-col py-6 space-y-4 border-t border-slate-200">
                            {!isLoading && session && (
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="inline-flex justify-center text-sm font-semibold leading-6 text-red-600 hover:text-red-900"
                                >
                                    Déconnexion <span aria-hidden="true">&rarr;</span>
                                </button>
                            )}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

            {showBanner && <Banners title={menuTitle} price={menuPrice} />} {/* Banner for special menu */}
        </header>
    );
}
