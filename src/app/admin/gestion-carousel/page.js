// app/admin/gestion-carousel/page.js
"use client";

import React, { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import { toast } from 'react-toastify';
import AdminLayout from '@/components/admin/AdminLayout';
import Loader from '@/components/Loader/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const CarouselAdminPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
                signOut({ callbackUrl: '/unauthorized' });  // Déconnexion forcée si l'utilisateur n'est plus admin
            } else {
                const fetchDishes = async () => {
                    try {
                        const res = await fetch('/api/carousel-data');
                        const data = await res.json();
                        setDishes(data);
                        setLoading(false);  // Stop loading when data is fetched
                    } catch (error) {
                        console.error("Erreur lors du chargement des données du carousel:", error);
                        toast.error("Erreur lors du chargement des données.");
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
                toast.success('Image téléchargée avec succès.');
            } else {
                toast.error('Erreur lors du téléchargement de l\'image.');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            toast.error('Échec du téléchargement de l\'image.');
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