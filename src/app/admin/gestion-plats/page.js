// app/admin/gestion-plats/page.js
"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import MenuSectionForm from '@/components/admin/MenuSectionForm';
import Loader from '@/components/Loader/Loader';
import { showToast } from '@/components/ui/ToastManager.js';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const normalizeMenuCarteItem = (item) => ({
    id: item.id || Date.now(),
    title: item.title || '',
    description: item.description || '',
    imageUrl: item.imageUrl || '',
    price: item.price || '',
    category: item.category || { title: '' },
});

export default function MenuCartePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                showToast('Erreur !', `Vous n'êtes pas autorisé à accéder à cette page.`, 'error');
                signOut({ callbackUrl: '/unauthorized' });
            } else {
                fetch('/api/menu-data?page=gestion-plats', { credentials: 'include' })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch menu carte data: ${res.statusText}`);
                        return res.json();
                    })
                    .then((data) => {
                        const normalizedData = Array.isArray(data) ? data.map(normalizeMenuCarteItem) : [];
                        setMenuData(normalizedData);
                    })
                    .catch(err => {
                        console.error("Error fetching menu carte data:", err);
                        showToast('Erreur !', `Erreur lors du chargement des données de la carte.`, 'error');
                    });
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/menu-data?page=gestion-plats', {
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
                    sectionName="menuCarte"
                    handleSubmit={handleSubmit}
                    setMenuData={setMenuData}
                    menuData={menuData}
                />
            </main>
        </AdminLayout>
    );
}
