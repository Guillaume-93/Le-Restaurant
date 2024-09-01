"use client";

import MenuSectionForm from '@/components/admin/MenuSectionForm';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/LoaderFull.js';
import { signOut } from 'next-auth/react';

export default function GestionSpecialMenuPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
                signOut({ callbackUrl: '/unauthorized' });
            } else {
                fetch('/api/menu-data?page=gestion-menu-special', { credentials: 'include' })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch special menu data: ${res.statusText}`);
                        return res.json();
                    })
                    .then((data) => {
                        setMenuData(Array.isArray(data) ? data : []);
                    })
                    .catch(err => {
                        console.error("Error fetching special menu data:", err);
                        toast.error('Erreur lors du chargement des données du menu spécial.');
                    });
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/menu-data?page=gestion-menu-special', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(menuData),
        });

        if (res.ok) {
            toast.success('Menu spécial mis à jour avec succès !');
        } else {
            toast.error('Échec de la mise à jour du menu spécial.');
        }
    };

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <AdminLayout>
            <MenuSectionForm
                sectionData={menuData}
                sectionName="specialMenu"
                handleSubmit={handleSubmit}
                setMenuData={setMenuData}
                menuData={menuData}
            />
        </AdminLayout>
    );
}
