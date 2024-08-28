// src/app/admin/page.js
"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';

const adminSections = [
    { title: 'Gestion de la page d\'accueil', href: '/admin/gestion-accueil', description: 'Modifiez le contenu de la page d\'accueil de votre site.' },
    { title: 'Gestion des menus et prix', href: '/admin/gestion-menus', description: 'Gérez les menus et les prix affichés sur votre site.' },
    { title: 'Gestion des plats', href: '/admin/gestion-plats', description: 'Ajoutez, modifiez ou supprimez les plats disponibles à la carte.' },
    { title: 'Gestion des desserts', href: '/admin/gestion-desserts', description: 'Gérez la liste des desserts proposés.' },
    { title: 'Gestion des vins', href: '/admin/gestion-vins', description: 'Modifiez la sélection de vins disponibles.' },
];

function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section) => (
                <Link key={section.href} href={section.href}>
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                        <p className="mt-2 text-gray-600">{section.description}</p>
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
                <header className="pb-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
                </header>
                <main className="pt-6">
                    <AdminDashboard />
                </main>
            </div>
        </AdminLayout>
    );
}
