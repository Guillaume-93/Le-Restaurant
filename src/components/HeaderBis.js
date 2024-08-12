"use client";

import { useState } from 'react';
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
    const router = useRouter();

    return (
        <header className="sticky inset-x-0 top-0 z-50 shadow-md bg-[--background-color-primary]">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <div className="flex items-center">
                    <Link href="/">
                        <span className="sr-only">Le Neuilly</span>
                        <img
                            alt="Le Neuilly"
                            src="images/le-neuilly-canva.png"
                            className="h-12 w-auto rounded-lg"
                        />
                    </Link>
                </div>
                <div className="hidden md:flex md:gap-x-12 justify-center flex-1">
                    {navigation.map((item) => {
                        const isActive = router.pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div
                                    className={`relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 ${isActive ? "after:w-full" : "after:w-0"
                                        } after:bg-gray-900`}
                                >
                                    {item.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex md:hidden justify-end flex-1">
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
            <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="md:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#DFDFDF] px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className='sm:hidden'>
                            <span className="sr-only">Le Neuilly</span>
                            <img
                                alt="Le Neuilly"
                                src="/images/le-neuilly-canva.png"
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
                                {navigation.map((item) => {
                                    const isActive = router.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 inline-flex rounded-lg px-3 py-2 text-base font-semibold leading-7 justify-center"
                                        >
                                            <div
                                                className={`relative text-sm font-semibold leading-6 text-slate-900 after:block after:h-0.5 ${isActive ? "after:w-full" : "after:w-0"
                                                    } after:bg-gray-900`}
                                            >
                                                {item.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
