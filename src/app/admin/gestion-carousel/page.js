// app/admin/gestion-carousel/page.js
"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import Loader from '@/components/Loader/Loader';
import { showToast } from '@/components/ui/ToastManager.js';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CarouselAdminPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                showToast('Erreur !', `Vous n'êtes pas autorisé à accéder à cette page.`, 'error');
                signOut({ callbackUrl: '/unauthorized' });  // Déconnexion forcée si l'utilisateur n'est plus admin
            } else {
                const fetchDishes = async () => {
                    try {
                        const res = await fetch('/api/carousel-data');
                        const data = await res.json();
                        setDishes(data);
                        setLoading(false);
                    } catch (error) {
                        console.error("Erreur lors du chargement des données du carousel:", error);
                        showToast('Erreur !', `Erreur lors du chargement des données du carousel.`, 'error');
                        setLoading(false);
                    }
                };

                fetchDishes();
            }
        } else if (status === 'unauthenticated') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    const handleImageChange = async (file, index) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('index', index);

        try {
            const res = await fetch('/api/upload-carousel-image', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setDishes(prevDishes => {
                    const updatedDishes = [...prevDishes];
                    updatedDishes[index].imageUrl1 = data.imageUrl;
                    return updatedDishes;
                });
                showToast('Succès !', `Image ${index + 1} du carousel mise à jour.`, 'success');
            } else {
                showToast('Erreur !', `Échec de la mise à jour de l'image.`, 'error');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            showToast('Erreur !', `Erreur lors du téléchargement de l'image.`, 'error');
        }
    };

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dishes.map((dish, index) => (
                        <div key={index} className="relative">
                            <ImageUpload
                                sectionName="carousel"
                                index={index}
                                imageUrl={dish.imageUrl1}
                                onImageChange={file => handleImageChange(file, index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CarouselAdminPage;
