// src/app/admin/page.js
"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/LoaderFull.js';
import {
    HomeIcon,
    BeakerIcon,
} from '@heroicons/react/24/outline';
import { MediaImageList, MultiplePages, HalfCookie, Cutlery } from 'iconoir-react';

const adminSections = [
    { title: 'Gestion de la page d\'accueil', href: '/admin/gestion-accueil', description: 'Modifiez le contenu de la page d\'accueil de votre site.', icon: HomeIcon },
    { title: 'Gestion du carrousel', href: '/admin/gestion-carousel', description: 'Modifiez les images du carrousel de la page d\'accueil.', icon: MediaImageList },
    { title: 'Gestion des menus et prix', href: '/admin/gestion-menus', description: 'Gérez les menus et les prix affichés sur votre site.', icon: MultiplePages },
    { title: 'Gestion des plats', href: '/admin/gestion-plats', description: 'Ajoutez, modifiez ou supprimez les plats disponibles à la carte.', icon: Cutlery },
    { title: 'Gestion des desserts', href: '/admin/gestion-desserts', description: 'Ajoutez, modifiez ou supprimez les desserts disponibles à la carte', icon: HalfCookie },
    { title: 'Gestion des vins', href: '/admin/gestion-vins', description: 'Ajoutez, modifiez ou supprimez les vins disponibles à la carte', icon: BeakerIcon },
];

function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
                <Link key={section.href} href={section.href}>
                    <div className="group p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300">
                        <div className="flex flex-col items-start gap-y-2">
                            <section.icon className="h-8 w-auto sm:h-10 text-indigo-800" />
                            <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                        </div>
                        <p className="mt-4 text-gray-600 group-hover:text-gray-800">{section.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function Admin() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
                signOut({ callbackUrl: '/unauthorized' });  // Déconnexion forcée si l'utilisateur n'est plus admin
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <AdminLayout>
            <div className="py-10">
                <main>
                    <AdminDashboard />
                </main>
            </div>
        </AdminLayout>
    );
}
