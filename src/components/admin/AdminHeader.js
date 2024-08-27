// src/components/admin/AdminHeader.js
"use client";

import { Disclosure, DisclosurePanel, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowLeftStartOnRectangleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const navigation = [
    { name: 'Tableau de bord', href: '/admin' },
    { name: 'Accueil', href: '/admin/gestion-accueil' },
    { name: 'Menus', href: '/admin/gestion-menus' },
    { name: 'Plats', href: '/admin/gestion-plats' },
    { name: 'Desserts', href: '/admin/gestion-desserts' },
    { name: 'Vins', href: '/admin/gestion-vins' },
];

const userNavigation = [
    { name: 'Retour au site', action: () => window.location.href = '/' },
    { name: 'Déconnexion', action: () => signOut({ callbackUrl: '/' }) },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminHeader({ session }) {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="bg-[--background-color-primary]">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-slate-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    alt="Le Neuilly Logo"
                                    src="/images/logos/le-neuilly-canva.png"
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
                                                    : 'text-slate-900 hover:bg-slate-700 hover:text-white',
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
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Ouvrir le menu utilisateur</span>
                                            <span className='px-2 text-slate-200'>{session.user.name}</span>
                                            <img alt="" src={session?.user?.image || "/default-avatar.png"} className="h-8 w-8 rounded-full" />
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
                                                    className="inline-flex w-full px-4 py-2 text-sm font-medium text-slate-700 data-[focus]:bg-slate-100"
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
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
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
                    pathname === item.href ? 'bg-slate-900 text-slate-100' : 'text-slate-700 hover:bg-slate-700 hover:text-slate-100',
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
                <img alt="" src={session?.user?.image || "/default-avatar.png"} className="h-10 w-10 rounded-full" />
            </div>
            <div className="ml-3">
                <div className="text-base font-medium leading-none text-slate-800">{session?.user?.name || "Utilisateur"}</div>
                <div className="text-sm font-medium leading-none text-slate-500">{session?.user?.email || "Email inconnu"}</div>
            </div>
        </div>
        <div className="mt-6 space-y-4 px-2 flex flex-col items-start">
            <button
                onClick={() => window.location.href = '/'}
                className="w-auto flex items-center px-3 py-1 text-base font-medium bg-slate-900 text-white rounded-md"
            >
                <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                Retour au site
            </button>
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-auto flex items-center rounded-md px-3 py-1 text-base font-medium text-slate-100 bg-red-600"
            >
                <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-2" />
                Déconnexion
            </button>
        </div>
    </div>
</DisclosurePanel>
        </Disclosure>
    );
}
