// app/admin/gestion-accueil/page.js
"use client";

import MenuSectionForm from '@/components/admin/MenuSectionForm';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/LoaderFull.js';
import { signOut } from 'next-auth/react';

export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState({
        title: "",
        subtitle: "",
        buttonText1: "",
        buttonLink1: "",
        buttonText2: "",
        buttonLink2: "",
        images: [
            { src: "", alt: "" },
            { src: "", alt: "" },
            { src: "", alt: "" },
            { src: "", alt: "" },
            { src: "", alt: "" }
        ],
        features: [ // Les fonctionnalités existantes
            { id: 1, name: "Cuisine raffinée", description: "Découvrez une cuisine française authentique...", href: "#", icon: "BoltIcon" },
            { id: 2, name: "Ambiance conviviale", description: "Un cadre chaleureux et élégant...", href: "#", icon: "UsersIcon" },
            { id: 3, name: "Événements spéciaux", description: "Organisez vos événements spéciaux...", href: "#", icon: "CalendarDaysIcon" }
        ]
    });

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
                signOut({ callbackUrl: '/unauthorized' });  // Déconnexion forcée si l'utilisateur n'est plus admin
            } else {
                fetch('/api/menu-data?page=gestion-accueil', { credentials: 'include' })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch menu data: ${res.statusText}`);
                        return res.json();
                    })
                    .then((data) => {
                        setMenuData(data);
                    })
                    .catch(err => {
                        console.error("Error fetching menu data:", err);
                        toast.error('Erreur lors du chargement des données.');
                    });
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/menu-data?page=gestion-accueil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(menuData),
        });

        if (res.ok) {
            toast.success('Données mises à jour avec succès !');
        } else {
            toast.error('Échec de la mise à jour des données.');
        }
    };

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <AdminLayout>
            {/* <header className="py-10">
                <h1 className="text-3xl font-bold">Gestion de la page d&apos;accueil</h1>
            </header> */}
            <main>
                <MenuSectionForm
                    sectionData={menuData}
                    sectionName="heroSection"
                    handleSubmit={handleSubmit}
                    setMenuData={setMenuData}
                    menuData={menuData}
                />
            </main>
        </AdminLayout>
    );
}
