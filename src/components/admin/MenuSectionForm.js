"use client";

import { showToast } from '@/components/ui/ToastManager';
import { Field, Label, Switch } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FormSection from './FormSection';

const sectionSingleTitle = {
    menusPrices: "Menu",
    menuCarte: "Plat",
    dessertsMenu: "Dessert",
    wineMenu: "Vin",
    heroSection: "Accueil",
    specialMenu: "Menu Spécial",
};

const normalizeItem = (sectionName) => {
    const baseItem = {
        id: Date.now(),
        title: '',
        description: '',
        imageUrl: '/images/no-image.webp',
    };

    switch (sectionName) {
        case 'menusPrices':
            return { ...baseItem, price: '', features: [] };
        case 'menuCarte':
        case 'dessertsMenu':
            return { ...baseItem, price: '', category: { title: '' } };
        case 'wineMenu':
            return { ...baseItem, year: '', volume: '', price: '', category: { title: '' } };
        case 'specialMenu':
            return {
                ...baseItem,
                plat: '',
                dessert: '',
                includedFeatures: [],
                note: '',
                price: '',
                footerText: '',
            };
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
        heroSection: "gestion-accueil",
        specialMenu: "gestion-menu-special",
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

            showToast('Succès !', `Votre ${sectionSingleTitle[sectionName]} a été supprimé avec succès`, 'success');
        } catch (error) {
            showToast('Erreur !', `Erreur lors de la suppression du ${sectionSingleTitle[sectionName]}`, 'error');
        }
    };

    const addItem = async () => {
        const newItem = normalizeItem(sectionName);

        try {
            // Récupérer la liste actuelle des éléments dans Firestore
            const res = await fetch(`/api/menu-data?page=${sectionPageMap[sectionName]}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Erreur lors de la récupération des données.');
            }

            const existingData = await res.json();

            // Assurer que `existingData` est bien un tableau
            const existingItems = Array.isArray(existingData) ? existingData : existingData[sectionPageMap[sectionName]] || [];

            // Vérifier que existingItems est un tableau
            if (!Array.isArray(existingItems)) {
                throw new Error('Les données existantes ne sont pas au format attendu.');
            }

            // Ajouter le nouvel élément au tableau
            const updatedItems = [newItem, ...existingItems];

            // Envoyer le tableau mis à jour directement à Firestore sans ajouter de clé supplémentaire
            const saveRes = await fetch(`/api/menu-data?page=${sectionPageMap[sectionName]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedItems), // Envoyer le tableau directement sans encapsulation dans un objet
            });

            if (saveRes.ok) {
                setMenuData(updatedItems); // Mettre à jour l'état local avec les données mises à jour
                showToast('Succès !', `${sectionSingleTitle[sectionName]} ajouté avec succès !`, 'success');
            } else {
                throw new Error('Échec de l\'ajout de l\'élément.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'élément:', error);
            showToast('Erreur !', `Erreur lors de l\'ajout du ${sectionSingleTitle[sectionName]}:`, 'error');
        }
    };

    const handleRemoveItem = (index) => {
        if (sectionName === 'heroSection') {
            showToast('Erreur !', `${sectionName} n'est pas un tableau.`, 'error');
            return;
        }
    
        toast((t) => (
            <>
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Supprimer l'élément
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Êtes-vous sûr de vouloir supprimer ce {sectionSingleTitle[sectionName]} ? Cette action est irréversible.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:pl-4 sm:ml-10">
                    <button
                        onClick={() => {
                            deleteItemFromDatabase(index);
                            toast.dismiss(t.id);
                        }}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                    >
                        Confirmer
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Annuler et fermer le toast
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                    >
                        Annuler
                    </button>
                </div>
            </>
        ), {
            position: "top-center",
            autoClose: false,  // Ne pas fermer automatiquement
            closeOnClick: false, // Ne pas fermer en cliquant
            draggable: false, // Désactiver le glissement
        });
    };

    const handleInputChange = (e, field, index = null) => {
        const value = e.target.value;

        setMenuData(prevData => {
            if (sectionName === 'heroSection') {
                // Traiter heroSection comme un objet
                return {
                    ...prevData,
                    [field]: value
                };
            } else {
                // Traiter les autres sections comme des tableaux
                const updatedSection = Array.isArray(menuData) ? [...menuData] : [];

                if (index !== null) {
                    updatedSection[index] = {
                        ...updatedSection[index],
                        [field]: value
                    };
                } else {
                    updatedSection[0] = {
                        ...updatedSection[0],
                        [field]: value
                    };
                }

                return updatedSection;
            }
        });
    };

    const handleShowChange = (value) => {
        setMenuData(prevData => {
            const updatedSection = [...menuData];
            if (sectionName === 'specialMenu') {
                updatedSection[0] = {
                    ...updatedSection[0],
                    show: value, // Mettre à jour la clé 'show'
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

    // Fonction pour ajouter une caractéristique dans includedFeatures
    const onAddIncludedFeature = (sectionName, itemIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            const item = updatedSection[itemIndex];

            if (!item.includedFeatures) {
                item.includedFeatures = []; // Assurez-vous que la propriété includedFeatures existe
            }

            // Ajoutez cette vérification pour empêcher d'ajouter une includedFeature vide si la dernière est déjà vide
            if (item.includedFeatures[item.includedFeatures.length - 1] === "") {
                return updatedSection;
            }

            item.includedFeatures.push(""); // Ajouter une seule includedFeature vide
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

    // Fonction pour supprimer une caractéristique dans includedFeatures
    const onRemoveIncludedFeature = (sectionName, itemIndex, featureIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            updatedSection[itemIndex].includedFeatures.splice(featureIndex, 1); // Supprimer la includedFeature
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

    // Fonction pour modifier une caractéristique dans includedFeatures
    const onChangeIncludedFeature = (e, sectionName, itemIndex, featureIndex) => {
        const value = e.target.value;
        setMenuData(prevData => {
            const updatedSection = [...prevData];
            updatedSection[itemIndex].includedFeatures[featureIndex] = value; // Mettre à jour la valeur de la includedFeature
            return updatedSection;
        });
    };

    // fonction pour gérer le changement d'image
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
                    showToast('Erreur !', 'Erreur lors de la conversion de l\'image. Veuillez réessayer.', 'error');
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

                showToast('Succès !', `Image téléchargée avec succès.`, 'success');
            } else {
                showToast('Erreur !', `Echec du téléchargement de l\'image.`, 'error');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            showToast('Erreur !', `Echec du téléchargement de l\'image.`, 'error');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const session = await getSession();
        if (!session || session.expires <= new Date().toISOString()) {
            showToast('Erreur !', `Votre session a expiré. Veuillez vous reconnecter.`, 'error');
            signIn();
            return;
        }

        if (session.user.role !== 'admin') {
            showToast('Erreur !', `Vous n'êtes pas autorisé à effectuer cette action.`, 'error');
            return;
        }

        handleSubmit(e);
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-12">
                <div className="flex flex-col sm:flex-none sm:block border-b border-gray-900/10 pb-12">
                    <div className="flex gap-x-2">
                        {['dessertsMenu', 'menuCarte', 'wineMenu'].includes(sectionName) && (
                            <button
                                onClick={addItem}
                                type="button"
                                className="bg-indigo-600 text-white rounded-md px-2 py-1 hover:bg-indigo-500 flex items-center gap-x-2 ml-2"
                            >
                                Ajouter un {sectionSingleTitle[sectionName]}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        )}
                        {sectionName === 'specialMenu' && (
                            <div className="flex gap-x-4 px-2 items-center">
                                <Field className="flex items-center">
                                    <Switch
                                        checked={menuData[0]?.show || false}
                                        onChange={(value) => handleShowChange(value)}
                                        className={`group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${menuData[0]?.show ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${menuData[0]?.show ? 'translate-x-5' : 'translate-x-0'}`}
                                        />
                                    </Switch>
                                    <Label as="span" className="ml-3 text-sm">
                                        <span className="font-medium text-gray-900">Afficher le menu spécial</span>
                                    </Label>
                                </Field>
                            </div>
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
                                    onAddIncludedFeature={onAddIncludedFeature}
                                    onRemoveIncludedFeature={onRemoveIncludedFeature}
                                    onChangeIncludedFeature={onChangeIncludedFeature}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
