"use client";

import MenuSectionForm from '@/components/admin/MenuSectionForm';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';
import { signOut } from 'next-auth/react';

const normalizeMenusPricesItem = (item) => ({
    name: item.name || '',
    infos: item.infos || false,
    id: item.id || Date.now(),
    href: item.href || '',
    price: item.price || '',
    description: item.description || '',
    features: Array.isArray(item.features) ? item.features : [],
    mostPopular: item.mostPopular || false,
});

export default function MenusPricesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
                signOut({ callbackUrl: '/unauthorized' });
            } else {
                fetch('/api/menu-data?page=gestion-menus', { credentials: 'include' })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch menus prices data: ${res.statusText}`);
                        return res.json();
                    })
                    .then((data) => {
                        const normalizedData = Array.isArray(data) ? data.map(normalizeMenusPricesItem) : [];
                        setMenuData(normalizedData);
                    })
                    .catch(err => {
                        console.error("Error fetching menus prices data:", err);
                        toast.error('Erreur lors du chargement des données des menus et prix.');
                    });
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/menu-data?page=gestion-menus', {
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
            <header className="py-10">
                <h1 className="text-3xl font-bold">Gestion des Menus et Prix</h1>
            </header>
            <main>
                <MenuSectionForm
                    sectionData={menuData}
                    sectionName="menusPrices"
                    handleSubmit={handleSubmit}
                    setMenuData={setMenuData}
                    menuData={menuData}
                />
            </main>
        </AdminLayout>
    );
}
