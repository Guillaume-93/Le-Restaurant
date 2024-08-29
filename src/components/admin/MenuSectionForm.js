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

const normalizeItem = (sectionName) => {
    const baseItem = {
        id: Date.now(),
        title: '',
        description: '',
        imageUrl: '',
    };

    switch (sectionName) {
        case 'menusPrices':
            return { ...baseItem, price: '', features: [] };
        case 'menuCarte':
        case 'dessertsMenu':
            return { ...baseItem, price: '', category: { title: '' } };
        case 'wineMenu':
            return { ...baseItem, year: '', volume: '', price: '', category: { title: '' } };
        default:
            return baseItem;
    }
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

    const sectionPageMap = {
        menusPrices: "gestion-menus",
        menuCarte: "gestion-plats",
        dessertsMenu: "gestion-desserts",
        wineMenu: "gestion-vins",
        heroSection: "gestion-accueil"
    };

    const deleteItemFromDatabase = async (index) => {
        const itemId = menuData[index].id; // Assurez-vous que chaque élément a un ID unique
        try {
            // Récupérer la page associée à la section en cours
            const page = sectionPageMap[sectionName];
            if (!page) {
                throw new Error('Nom de section invalide.');
            }

            const url = `/api/menu-data/${itemId}?page=${page}`;
            const res = await fetch(url, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Échec de la suppression de l\'élément.');

            // Mettre à jour l'état après la suppression
            setMenuData(prevData => {
                const updatedSection = [...prevData];
                updatedSection.splice(index, 1);
                return updatedSection;
            });

            toast.success('Élément supprimé avec succès !');
        } catch (error) {
            toast.error('Erreur lors de la suppression de l\'élément.');
        }
    };

    const addItem = () => {
        const newItem = normalizeItem(sectionName);
        setMenuData([newItem, ...menuData]); // Insère le nouvel élément au début du tableau
    };    

    const handleRemoveItem = (index) => {
        if (sectionName === 'heroSection') {
            toast.error(`${sectionName} n'est pas un tableau.`);
            return;
        }

        // Afficher un toast de confirmation
        toast((t) => (
            <div>
                <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                <div className="mt-2 flex justify-end gap-x-2">
                    <button
                        onClick={() => {
                            deleteItemFromDatabase(index); // Appel à l'API pour supprimer l'élément
                            toast.dismiss(t.id);
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded"
                    >
                        Confirmer
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        ), {
            position: "top-center",
            autoClose: false, // Ne pas fermer automatiquement
            closeOnClick: false,
            draggable: false,
        });
    };

    const handleInputChange = (e, field, index = null) => {
        const value = e.target.value;
    
        setMenuData(prevData => {
            const updatedSection = [...menuData];
    
            if (index !== null) {
                // Vérifier si le champ est imbriqué, comme category.title
                if (field.includes('.')) {
                    const fields = field.split('.');
                    const parentField = fields[0];
                    const childField = fields[1];
    
                    updatedSection[index] = {
                        ...updatedSection[index],
                        [parentField]: {
                            ...updatedSection[index][parentField],
                            [childField]: value
                        }
                    };
                } else {
                    updatedSection[index] = {
                        ...updatedSection[index],
                        [field]: value
                    };
                }
            } else {
                updatedSection[0] = {
                    ...updatedSection[0],
                    [field]: value
                };
            }
    
            return updatedSection;
        });
    };
    

    // Fonction pour ajouter une caractéristique
    const onAddFeature = (sectionName, itemIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            const item = updatedSection[itemIndex];

            if (!item.features) {
                item.features = []; // Assurez-vous que la propriété features existe
            }

            // Ajoutez cette vérification pour empêcher d'ajouter une feature vide si la dernière est déjà vide
            if (item.features[item.features.length - 1] === "") {
                return updatedSection;
            }

            item.features.push(""); // Ajouter une seule feature vide
            return updatedSection;
        });
    };

    // Fonction pour supprimer une caractéristique
    const onRemoveFeature = (sectionName, itemIndex, featureIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            updatedSection[itemIndex].features.splice(featureIndex, 1); // Supprimer la feature
            return updatedSection;
        });
    };

    // Fonction pour modifier une caractéristique
    const onChangeFeature = (e, sectionName, itemIndex, featureIndex) => {
        const value = e.target.value;
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            updatedSection[itemIndex].features[featureIndex] = value; // Mettre à jour la valeur de la feature
            return updatedSection;
        });
    };

    const handleImageChange = async (file, index, sectionName, imageIndex = null) => {
        let convertedFile = file;

        // Conversion du format HEIC/HEIF en JPEG
        if (file.type === 'image/heic' || file.type === 'image/heif') {
            if (typeof window !== 'undefined') {
                const heic2any = (await import("heic2any")).default;
                try {
                    const blob = await heic2any({
                        blob: file,
                        toType: "image/jpeg",
                    });
                    convertedFile = new File([blob], `${file.name.split('.')[0]}.jpg`, { type: "image/jpeg" });
                } catch (error) {
                    console.error('Erreur lors de la conversion HEIC/HEIF:', error);
                    toast.error('Erreur lors de la conversion de l\'image. Veuillez réessayer.');
                    return;
                }
            }
        }

        const formData = new FormData();
        formData.append('image', convertedFile);
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
                    <div className="flex gap-x-2">
                        <h2 className="text-xl font-semibold leading-7 text-gray-900">{sectionTitles[sectionName]}</h2>
                        {['dessertsMenu', 'menuCarte', 'wineMenu'].includes(sectionName) && (
                            <button
                                onClick={addItem}
                                type="button"
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ${sectionName === 'heroSection' ? '' : ''}`}>
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
                                    onAddFeature={onAddFeature}
                                    onRemoveFeature={onRemoveFeature}
                                    onChangeFeature={onChangeFeature}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
