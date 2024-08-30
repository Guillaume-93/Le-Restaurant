// src/components/admin/AdminLayout.js
"use client";

import AdminHeader from './AdminHeader';
import { useSession, signOut } from 'next-auth/react';
import Loader from '@/components/Loader/Loader';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link';

import {
    Bars3Icon, 
    XMarkIcon, 
    HomeIcon,
    DocumentDuplicateIcon,
    CakeIcon,
    BeakerIcon,
    BookOpenIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Tableau de bord', href: '/admin' },
    { name: 'Accueil', href: '/admin/gestion-accueil' },
    { name: 'Menus', href: '/admin/gestion-menus' },
    { name: 'Plats', href: '/admin/gestion-plats' },
    { name: 'Desserts', href: '/admin/gestion-desserts' },
    { name: 'Vins', href: '/admin/gestion-vins' },
    // { name: 'À propos', href: '/admin/gestion-a-propos' },
    // { name: 'Contact', href: '/admin/gestion-contact' },
];

const userNavigation = [
    { name: 'Retour au site', action: () => window.location.href = '/' },
    { name: 'Déconnexion', action: () => signOut({ callbackUrl: '/' }) },
];

const sectionNames = {
    '/admin': { title: 'Tableau de bord Administrateur', icon: IdentificationIcon },
    '/admin/gestion-accueil': { title: 'Gestion de la page d\'accueil', icon: HomeIcon },
    '/admin/gestion-menus': { title: 'Gestion des Menus et Prix', icon: DocumentDuplicateIcon },
    '/admin/gestion-plats': { title: 'Gestion des Plats', icon: BookOpenIcon },
    '/admin/gestion-desserts': { title: 'Gestion des Desserts', icon: CakeIcon },
    '/admin/gestion-vins': { title: 'Gestion des Vins', icon: BeakerIcon },
    // '/admin/gestion-a-propos': { title: 'Gestion de la page À propos', icon: InformationCircleIcon },
    // '/admin/gestion-contact': { title: 'Gestion de la page Contact', icon: PhoneIcon },
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
                    toast.error("Votre session a expiré ou vous n'avez plus les droits requis.");
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
                                        <img
                                            alt="Le Neuilly Logo"
                                            src="/images/logos/le-neuilly-white.png"
                                            className="h-8 cursor-pointer"
                                            onClick={() => window.location.href = '/'}
                                        />
                                    </div>
                                    <div className="hidden lg:block">
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
                                <div className="hidden lg:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 ring-1 ring-slate-100 hover:ring-2">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                                                    <span className='px-2 text-slate-200'>{session.user.name}</span>
                                                    <img alt="" src={session?.user?.image || "images/avatars/default-avatar.jpg"} className="h-8 w-8 rounded-full" />
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
                                <div className="-mr-2 flex lg:hidden">
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
                    <DisclosurePanel className="border-b border-slate-700 lg:hidden">
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
                                    <img alt="" src={session?.user?.image || "/images/avatars/default-avatar.jpg"} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-slate-300">{session?.user?.name || "Utilisateur"}</div>
                                    <div className="text-sm font-medium leading-none text-slate-500">{session?.user?.email || "Email inconnu"}</div>
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
                    <div className="text-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-white" />
                        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    </div>
                </header>
            </div>

            <main className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
