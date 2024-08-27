"use client";

import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import FormSection from './FormSection';

const sectionTitles = {
    menusPrices: "Menus",
    menuCarte: "Plats",
    dessertsMenu: "Desserts",
    wineMenu: "Vins",
    heroSection: "Accueil"
};

export default function MenuSectionForm({
    sectionData = {},
    sectionName,
    setMenuData,
    handleSubmit,
    menuData,
}) {
    const [filesToUpload, setFilesToUpload] = useState({});

    useEffect(() => {
        setFilesToUpload({});
    }, [sectionName]);

    const handleRemoveItem = (index) => {
        if (sectionName === 'heroSection') {
            toast.error(`${sectionName} n'est pas un tableau.`);
            return;
        }
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            updatedSection.splice(index, 1);
            return updatedSection;
        });
    };

    const handleInputChange = (e, field, index = null) => {
        const value = e.target.value;
        setMenuData(prevData => {
            if (sectionName === 'heroSection') {
                return { ...prevData, [field]: value };
            } else {
                const updatedSection = [...menuData];
                updatedSection[index] = { ...updatedSection[index], [field]: value };
                return updatedSection;
            }
        });
    };

    const handleImageChange = async (file, index, sectionName, imageIndex = null) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('section', sectionName);
        formData.append('index', imageIndex !== null ? imageIndex : index);
    
        try {
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
    
            if (uploadResponse.ok) {
                const data = await uploadResponse.json();
                const imageUrlFromServer = data.imageUrl;
    
                setMenuData(prevData => {
                    if (sectionName === 'heroSection' && imageIndex !== null) {
                        const updatedImages = [...prevData.images];
                        updatedImages[imageIndex].src = imageUrlFromServer;
                        return { ...prevData, images: updatedImages };
                    } else {
                        const updatedSection = [...menuData];
                        updatedSection[index].imageUrl = imageUrlFromServer;
                        return updatedSection;
                    }
                });
    
                toast.success('Image téléchargée avec succès.');
            } else {
                toast.error('Échec du téléchargement de l\'image.');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            toast.error('Échec du téléchargement de l\'image.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const session = await getSession();
        if (!session || session.expires <= new Date().toISOString()) {
            toast.error('Votre session a expiré. Veuillez vous reconnecter.');
            signIn();
            return;
        }

        if (session.user.role !== 'admin') {
            toast.error("Vous n'êtes pas autorisé à effectuer cette action.");
            return;
        }

        handleSubmit(e);
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-12">
                <div className="flex flex-col sm:flex-none sm:block border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">{sectionTitles[sectionName]}</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {sectionName === 'heroSection' ? (
                            <FormSection
                                item={menuData}
                                sectionName={sectionName}
                                index={0}
                                onInputChange={handleInputChange}
                                onRemoveItem={handleRemoveItem}
                                onImageChange={handleImageChange}
                            />
                        ) : (
                            menuData.map((item, index) => (
                                <FormSection
                                    key={index}
                                    item={item}
                                    sectionName={sectionName}
                                    index={index}
                                    onInputChange={handleInputChange}
                                    onRemoveItem={handleRemoveItem}
                                    onImageChange={handleImageChange}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sauvegarder
                </button>
            </div>
        </form>
    );
}
