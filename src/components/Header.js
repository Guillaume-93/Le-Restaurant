"use client";

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const { data: session, status } = useSession();
    const isLoading = status === 'loading';
    const router = useRouter();

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const handleNavigationChange = (href) => {
        setActiveLink(href);
    };

    return (
        <header className="sticky inset-x-0 top-0 z-50 shadow-md bg-[--background-color-primary]">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" onClick={() => handleNavigationChange('/')}>
                        <span className="sr-only">Le Neuilly</span>
                        <img
                            alt="Image représentant le logo du restaurant Le Neuilly"
                            src="images/logos/le-neuilly-canva.png"
                            className="h-12 w-auto rounded-lg"
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
                    {!isLoading && session && (
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
                            {session ? (
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-semibold leading-6 py-0.5 text-red-600 hover:text-red-900"
                                >
                                    Déconnexion <span aria-hidden="true">&rarr;</span>
                                </button>
                            ) : (
                                <div className="flex items-center">
                                    <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-900">
                                        Se connecter <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
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
                            <img
                                alt="Le Neuilly"
                                src="/images/logos/le-neuilly-canva.png"
                                className="h-12 w-auto rounded-lg"
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
                                            className={`relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 ${activeLink === item.href ? "after:w-full" : "after:w-0"
                                                } after:bg-gray-900`}
                                        >
                                            {item.name}
                                        </div>
                                    </Link>
                                ))}
                                {!isLoading && session && (
                                    <Link
                                        href="/admin"
                                        className="inline-flex justify-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-indigo-600"
                                        onClick={() => handleNavigationChange('/admin')}
                                    >
                                        <div
                                            className={`relative text-sm font-semibold leading-6 px-3 text-slate-100 bg-indigo-600 rounded-full after:block after:h-0.5 ${activeLink === '/admin' ? "after:w-full" : "after:w-0"
                                                } after:bg-indigo-600`}
                                        >
                                            Tableau de bord
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="flex flex-col py-6 space-y-4">
                                {!isLoading && (
                                    <>
                                        {session ? (
                                            <button
                                                onClick={() => signOut()}
                                                className="inline-flex justify-center text-sm font-semibold leading-6 text-red-600 hover:text-red-900"
                                            >
                                                Déconnexion <span aria-hidden="true">&rarr;</span>
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-900">
                                                    Se connecter <span aria-hidden="true">&rarr;</span>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
