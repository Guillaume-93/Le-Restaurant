"use client";

import Banners from '@/components/homepage/Banners';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(router.pathname);
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const [showBanner, setShowBanner] = useState(false); // État pour afficher la bannière
    const [menuTitle, setMenuTitle] = useState('');
    const [menuPrice, setMenuPrice] = useState('');

    useEffect(() => {
        if (router.pathname) {
            setActiveLink(router.pathname);
        }
    }, [router.pathname]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const res = await fetch('/api/menu-data?page=gestion-menu-special');
                if (!res.ok) throw new Error(`Failed to fetch special menu data: ${res.statusText}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0 && data[0]?.show) {
                    setShowBanner(true); // Affiche la bannière si le menu spécial est affiché
                    setMenuTitle(data[0]?.title); // Stocker le titre
                    setMenuPrice(data[0]?.price); // Stocker le prix
                } else {
                    setShowBanner(false);
                }
            } catch (err) {
                console.error("Error fetching special menu data:", err);
                setShowBanner(false); // Ne pas afficher la bannière en cas d'erreur ou si le menu n'est pas disponible
            }
        };
        fetchMenuData();
    }, []); // Effet pour charger le menu spécial au montage du composant

    const handleNavigationChange = (href) => {
        setActiveLink(href);
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky inset-x-0 top-0 z-50 shadow-md bg-[--background-color-primary]">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" onClick={() => handleNavigationChange('/')}>
                        <span className="sr-only">Le Neuilly</span>
                        <Image
                            alt="Image représentant le logo du restaurant Le Neuilly"
                            src="/images/logos/le-neuilly-canva.webp"
                            className="h-12 w-auto rounded-lg"
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
                            onClick={() => handleNavigationChange(item.href)}
                        >
                            <div
                                className={`relative text-sm font-semibold leading-6 py-0.5 text-slate-900 after:block after:h-0.5 ${activeLink === item.href ? "after:w-full" : "after:w-0"} after:bg-gray-900`}
                            >
                                {item.name}
                            </div>
                        </Link>
                    ))}
                    {!isLoading && session && session.user.role === 'admin' && (
                        <Link
                            href="/admin"
                            onClick={() => handleNavigationChange('/admin')}
                        >
                            <div
                                className={`relative text-sm font-semibold leading-6 px-3 py-0.5 text-slate-100 bg-indigo-600 rounded-full after:block after:h-0.5 ${activeLink === '/admin' ? "after:w-full" : "after:w-0"} after:bg-indigo-600`}
                            >
                                Tableau de bord
                            </div>
                        </Link>
                    )}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-4">
                    {!isLoading && (
                        <>
                            {session && (
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="text-sm font-semibold leading-6 py-0.5 text-red-600 hover:text-red-900"
                                >
                                    Déconnexion <span aria-hidden="true">&rarr;</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
                <div className="flex lg:hidden justify-end flex-1">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[--background-color-primary] px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className='sm:hidden' onClick={() => handleNavigationChange('/')}>
                            <span className="sr-only">Le Neuilly</span>
                            <Image
                                alt="Le Neuilly"
                                src="/images/logos/le-neuilly-canva.webp"
                                className="h-12 w-auto rounded-lg"
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
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="flex flex-col space-y-2 py-10 px-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 inline-flex rounded-lg px-3 py-2 text-base font-semibold leading-7 justify-center"
                                        onClick={() => handleNavigationChange(item.href)}
                                    >
                                        <div
                                            className={`relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 ${activeLink === item.href ? "after:w-full" : "after:w-0"} after:bg-gray-900`}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                                {!isLoading && session && session.user.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="inline-flex justify-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-indigo-600"
                                        onClick={() => handleNavigationChange('/admin')}
                                    >
                                        <div
                                            className={`relative text-sm font-semibold leading-6 px-3 text-slate-100 bg-indigo-600 rounded-full after:block after:h-0.5 ${activeLink === '/admin' ? "after:w-full" : "after:w-0"} after:bg-indigo-600`}
                                        >
                                            Tableau de bord
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="flex flex-col py-6 space-y-4">
                                {!isLoading && (
                                    <>
                                        {session && (
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="inline-flex justify-center text-sm font-semibold leading-6 text-red-600 hover:text-red-900"
                                            >
                                                Déconnexion <span aria-hidden="true">&rarr;</span>
                                            </button>

                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

            {showBanner && <Banners title={menuTitle} price={menuPrice} />} {/* Passer le titre et le prix à la bannière */}
        </header>
    );
}
