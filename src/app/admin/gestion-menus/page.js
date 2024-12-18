// app/admin/gestion-menus/page.js
"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import MenuSectionForm from '@/components/admin/MenuSectionForm';
import Loader from '@/components/Loader/Loader';
import { showToast } from '@/components/ui/ToastManager.js';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const normalizeMenusPricesItem = (item) => ({
    name: item.name || '',
    infos: item.infos || false,
    id: item.id || Date.now(),
    href: item.href || '',
    price: item.price || '',
    description: item.description || '',
    features: Array.isArray(item.features) ? item.features : [],
    mostPopular: item.mostPopular || false,
    platDuJour: item.platDuJour || '',
    poissonDuJour: item.poissonDuJour || '',
    accompagnements: item.accompagnements || '',
    desserts: item.desserts || '',
});

export default function MenusPricesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                showToast('Erreur !', `Vous n'êtes pas autorisé à accéder à cette page.`, 'error');
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
                        showToast('Erreur !', `Erreur lors du chargement des données des menus et prix.`, 'error');
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
            showToast('Succès !', `Données mises à jour avec succès !`, 'success');
        } else {
            showToast('Erreur !', `Échec de la mise à jour des données.`, 'error');
        }
    };

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <AdminLayout>
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
