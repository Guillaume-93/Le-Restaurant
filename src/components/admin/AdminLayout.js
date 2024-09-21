// src/components/admin/AdminLayout.js
"use client";

import Loader from '@/components/Loader/LoaderFull.js';
import { showToast } from '@/components/ui/ToastManager.js';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

import {
    Bars3Icon,
    BeakerIcon,
    HomeIcon,
    IdentificationIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { CircleSpark, Cutlery, HalfCookie, MediaImageList, MultiplePages } from 'iconoir-react';
import Image from 'next/image.js';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Tableau de bord', href: '/admin' },
    { name: 'Accueil', href: '/admin/gestion-accueil' },
    { name: 'Carrousel', href: '/admin/gestion-carousel' },
    { name: 'Menus', href: '/admin/gestion-menus' },
    { name: 'Plats', href: '/admin/gestion-plats' },
    { name: 'Desserts', href: '/admin/gestion-desserts' },
    { name: 'Vins', href: '/admin/gestion-vins' },
    { name: 'Menu Spécial', href: '/admin/gestion-menu-special' },
];

const userNavigation = [
    { name: 'Retour au site', action: () => window.location.href = '/' },
    { name: 'Déconnexion', action: () => signOut({ callbackUrl: '/' }) },
];

const sectionNames = {
    '/admin': { title: 'Tableau de bord Administrateur', icon: IdentificationIcon },
    '/admin/gestion-accueil': { title: 'Gestion de la page d\'accueil', icon: HomeIcon },
    '/admin/gestion-carousel': { title: 'Gestion du Carrousel', icon: MediaImageList },
    '/admin/gestion-menus': { title: 'Gestion des Menus et Prix', icon: MultiplePages },
    '/admin/gestion-plats': { title: 'Gestion des Plats', icon: Cutlery },
    '/admin/gestion-desserts': { title: 'Gestion des Desserts', icon: HalfCookie },
    '/admin/gestion-vins': { title: 'Gestion des Vins', icon: BeakerIcon },
    '/admin/gestion-menu-special': { title: 'Gestion du Menu Spécial', icon: CircleSpark },
};

const getSectionName = (pathname) => {
    return sectionNames[pathname] || { title: 'Dashboard', icon: HomeIcon };
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        const checkUserRole = async () => {
            if (session?.user?.firebaseUid) {
                try {
                    const res = await fetch('/api/check-role', {
                        method: 'GET',
                        credentials: 'include',
                    });
                    if (!res.ok) {
                        throw new Error('Rôle non valide ou session expirée');
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification du rôle:', error);
                    showToast('Erreur !', 'Votre session a expiré ou vous n\'avez plus les droits requis.', 'error');
                    signOut({ callbackUrl: '/unauthorized' });
                }
            }
        };

        const intervalId = setInterval(() => {
            checkUserRole();
        }, 120000);

        checkUserRole();

        return () => clearInterval(intervalId);
    }, [session]);

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    const { title, icon: Icon } = getSectionName(pathname);

    return (
        <div className="min-h-full">
            <div className="bg-[--background-color-dashboard] pb-32">
                <Disclosure as="nav" className="bg-[--background-color-dashboard]">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="border-b border-slate-700">
                            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Image
                                            alt="Le Restaurant Logo"
                                            src="/images/logos/le-restaurant.png"
                                            className="h-8 w-auto rounded-lg cursor-pointer"
                                            onClick={() => window.location.href = '/'}
                                            width={200}
                                            height={100}
                                            priority
                                        />
                                    </div>
                                    <div className="hidden xl:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    aria-current={pathname === item.href ? 'page' : undefined}
                                                    className={classNames(
                                                        pathname === item.href
                                                            ? 'bg-slate-900 text-white'
                                                            : 'text-white hover:bg-slate-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden xl:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 ring-1 ring-slate-100 hover:ring-2">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                                                    <span className='px-2 text-slate-200'>{session.user.name}</span>
                                                    <Image
                                                        alt=""
                                                        src={session?.user?.image || "images/avatars/default-avatar.jpg"}
                                                        className="h-8 w-8 rounded-full"
                                                        width={32}
                                                        height={32}
                                                    />
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {userNavigation.map((item) => (
                                                    <MenuItem key={item.name}>
                                                        <button
                                                            onClick={item.action}
                                                            className="inline-flex w-full px-4 py-2 text-sm text-slate-700 data-[focus]:bg-slate-100"
                                                        >
                                                            {item.name}
                                                        </button>
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex xl:hidden">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-slate-100 hover:text-slate-400 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-slate-100">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Ouvrir le menu principal</span>
                                        <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="border-b border-slate-700 xl:hidden">
                        <div className="space-y-1 px-2 py-3 sm:px-3">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    aria-current={pathname === item.href ? 'page' : undefined}
                                    className={classNames(
                                        pathname === item.href ? 'bg-slate-900 text-slate-100' : 'text-slate-300 hover:bg-slate-700 hover:text-slate-100',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-slate-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <Image
                                        alt=""
                                        src={session?.user?.image || "/images/avatars/default-avatar.jpg"}
                                        className="h-10 w-10 rounded-full"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-slate-300">{session?.user?.name || "Utilisateur"}</div>
                                    <div className="mt-2 text-sm font-medium leading-none text-slate-500">{session?.user?.email || "Email inconnu"}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        onClick={item.action}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                <header className="py-10">
                    <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center space-x-3">
                        <Icon className="h-14 w-auto text-white" />
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mt-2 sm:mt-0">{title}</h1>
                    </div>
                </header>
            </div>

            <main className="-mt-32">
                <div className="mx-auto max-w-7xl pb-12 sm:px-6 lg:px-8">
                    <div className="sm:rounded-lg bg-white px-1 py-6 shadow sm:px-6">
                        {status === 'loading' ? <Loader /> : children}
                    </div>
                </div>
            </main>
        </div>
    );
}
