// src/components/admin/MenuSectionForm.js

"use client"

import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const sectionTitles = {
    menusPrices: "Menus",
    menuCarte: "Plats",
    dessertsMenu: "Desserts",
    wineMenu: "Vins",
    heroSection: "Accueil"
};

function MenuSectionForm({
    sectionData = {},
    sectionName,
    handleInputChange,
    handleSubmit,
    setMenuData,
    handleAddItem,
    handleRemoveItem,
    menuData,
    renderPremiumBadge
}) {
    const [temporaryImages, setTemporaryImages] = useState({});
    const [filesToUpload, setFilesToUpload] = useState({});

    useEffect(() => {
        setTemporaryImages({});
        setFilesToUpload({});
    }, [sectionName]);

    const handleImageChange = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                toast.error('Seuls les fichiers PNG, JPG et WEBP sont acceptés.');
                return;
            }
            
            if (file.size > 10 * 1024 * 1024) { // Vérifie que la taille est inférieure à 10MB
                toast.error('La taille du fichier doit être inférieure à 10MB.');
                return;
            }
    
            const imageUrl = URL.createObjectURL(file);
            setTemporaryImages(prevState => ({
                ...prevState,
                [`${sectionName}-${index}`]: imageUrl,
            }));
    
            const formData = new FormData();
            formData.append('image', file);
            formData.append('section', sectionName);
            formData.append('index', index);
    
            try {
                const uploadResponse = await fetch('/api/upload-image', {
                    method: 'POST',
                    body: formData,
                });
    
                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    const imageUrlFromServer = data.imageUrl;
    
                    setMenuData(prevData => {
                        if (Array.isArray(prevData[sectionName])) {
                            const updatedSection = [...prevData[sectionName]];
                            updatedSection[index].imageUrl = imageUrlFromServer;
                            return { ...prevData, [sectionName]: updatedSection };
                        } else {
                            const updatedSection = { ...prevData[sectionName] };
                            updatedSection.images[index].src = imageUrlFromServer;
                            return { ...prevData, [sectionName]: updatedSection };
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
        }
    };
    

    const handleFeatureChange = (e, section, itemIndex, featureIndex) => {
        const value = e.target.value;
        setMenuData(prevData => {
            const updatedSection = [...prevData[section]];
            updatedSection[itemIndex].features[featureIndex] = value;
            return { ...prevData, [section]: updatedSection };
        });
    };

    const handleAddFeature = (section, itemIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData[section]];
            updatedSection[itemIndex].features = [...updatedSection[itemIndex].features, ''];
            return { ...prevData, [section]: updatedSection };
        });
    };

    const handleRemoveFeature = (section, itemIndex, featureIndex) => {
        setMenuData(prevData => {
            const updatedSection = [...prevData[section]];
            updatedSection[itemIndex].features = updatedSection[itemIndex].features.filter((_, i) => i !== featureIndex);
            return { ...prevData, [section]: updatedSection };
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log("Save action triggered.");

        const session = await getSession();
        console.log("Session retrieved:", session);
        if (!session) {
            toast.error('Votre session a expiré. Veuillez vous reconnecter.');
            signIn();
            return;
        }

        const formData = new FormData();
        Object.keys(filesToUpload).forEach(key => {
            formData.append('image', filesToUpload[key]);
            formData.append('section', sectionName);
            formData.append('index', key.split('-')[1]);
        });

        if (Object.keys(filesToUpload).length > 0) {
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.ok) {
                const data = await uploadResponse.json();
                data.images.forEach((image, i) => {
                    const section = sectionName;
                    const index = Object.keys(filesToUpload)[i].split('-')[1];
                    setMenuData(prevData => {
                        const updatedSection = isHeroSection ? { ...prevData[section] } : [...prevData[section]];
                        if (isHeroSection) {
                            updatedSection.images[index].src = image.imageUrl;
                        } else {
                            updatedSection[index].imageUrl = image.imageUrl;
                        }
                        return { ...prevData, [section]: updatedSection };
                    });
                });
            } else {
                console.error('Échec du téléchargement des images.');
                toast.error('Échec du téléchargement des images.');
                return;
            }
        }

        const saveResponse = await fetch('/api/menu-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(menuData),
        });
        console.log("Save response status:", saveResponse.status);
        if (saveResponse.ok) {
            toast.success('Données sauvegardées avec succès !');
        } else {
            console.error('Échec de la sauvegarde des données.');
            toast.error('Échec de la sauvegarde des données.');
        }
    };

    const isHeroSection = sectionName === 'heroSection';
    const data = isHeroSection ? sectionData || {
        title: '',
        subtitle: '',
        buttonText1: '',
        buttonLink1: '',
        buttonText2: '',
        buttonLink2: '',
        images: [{ src: '', alt: '' }]
    } : sectionData;

    const isClickable = false;

    const renderCadenasPremium = () => (
        <div className={`flex items-center space-x-1 text-sm ${!isClickable && 'pointer-events-none'}`}>
            <LockClosedIcon className="h-4 w-4 text-red-600" aria-hidden="true" />
        </div>
    );

    const renderCadenasFree = () => (
        <div className={`${!isClickable && 'pointer-events-none'}`}>
            <LockOpenIcon className="h-4 w-4 text-slate-900 hidden" aria-hidden="true" />
        </div>
    );

    return (
        <form onSubmit={handleSave} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-12">
                <div className="flex flex-col sm:flex-none sm:block border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">{sectionTitles[sectionName]}</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {isHeroSection && (
                            <div className="flex flex-col sm:flex-none sm:block col-span-full ring-1 ring-slate-300 p-4 rounded-lg shadow-default">
                                <div className="mb-1 flex items-center gap-x-2">
                                    <label htmlFor={`title`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                                    {renderCadenasFree()}
                                </div>
                                <input
                                    type="text"
                                    id={`title`}
                                    value={data.title}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'title')}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                                <div className="mb-1 flex items-center mt-4 gap-x-2">
                                    <label htmlFor={`subtitle`} className="block text-sm font-medium leading-6 text-gray-900">Sous-titre</label>
                                    {renderCadenasFree()}
                                </div>
                                <textarea
                                    id={`subtitle`}
                                    value={data.subtitle}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'subtitle')}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                                <div className="mb-1 flex items-center mt-4 gap-x-2">
                                    <label htmlFor={`buttonText1`} className={`block text-sm font-medium leading-6 text-gray-900 ${!isClickable && 'pointer-events-none'}`}>Texte du Bouton 1</label>
                                    {renderCadenasPremium()}
                                </div>
                                <input
                                    type="text"
                                    id={`buttonText1`}
                                    value={data.buttonText1}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'buttonText1')}
                                    className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isClickable && 'pointer-events-none'}`}
                                />

                                <div className="mb-1 flex items-center mt-4 gap-x-2">
                                    <label htmlFor={`buttonLink1`} className={`block text-sm font-medium leading-6 text-gray-900 ${!isClickable && 'pointer-events-none'}`}>Lien du Bouton 1</label>
                                    {renderCadenasPremium()}
                                </div>
                                <input
                                    type="text"
                                    id={`buttonLink1`}
                                    value={data.buttonLink1}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'buttonLink1')}
                                    className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isClickable && 'pointer-events-none'}`}
                                />

                                <div className="mb-1 flex items-center mt-4 gap-x-2">
                                    <label htmlFor={`buttonText2`} className={`block text-sm font-medium leading-6 text-gray-900 ${!isClickable && 'pointer-events-none'}`}>Texte du Bouton 2</label>
                                    {renderCadenasPremium()}
                                </div>
                                <input
                                    type="text"
                                    id={`buttonText2`}
                                    value={data.buttonText2}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'buttonText2')}
                                    className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isClickable && 'pointer-events-none'}`}
                                />

                                <div className="mb-1 flex items-center mt-4 gap-x-2">
                                    <label htmlFor={`buttonLink2`} className={`block text-sm font-medium leading-6 text-gray-900 ${!isClickable && 'pointer-events-none'}`}>Lien du Bouton 2</label>
                                    {renderCadenasPremium()}
                                </div>
                                <input
                                    type="text"
                                    id={`buttonLink2`}
                                    value={data.buttonLink2}
                                    onChange={(e) => handleInputChange(e, sectionName, 0, 'buttonLink2')}
                                    className={`px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!isClickable && 'pointer-events-none'}`}
                                />

                                <div className="mt-6">
                                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                                        <label className="block text-sm font-medium text-gray-700">Images</label>
                                        {renderCadenasFree()}
                                    </div>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
                                                {data.images.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={temporaryImages[`${sectionName}-${index}`] || image.src}
                                                            alt={image.alt}
                                                            className="mx-auto h-40 w-40 sm:h-52 sm:w-52 rounded-md object-cover shadow-default"
                                                        />
                                                        <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor={`file-upload-${index}`}
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Changer d'image</span>
                                                                <input
                                                                    id={`file-upload-${index}`}
                                                                    name={`file-upload-${index}`}
                                                                    type="file" className="sr-only"
                                                                    onChange={(e) => handleImageChange(e, index)} />
                                                            </label>
                                                            <p className="pl-1">ou glisser déposer</p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600 mt-2">PNG, JPG, WEBP jusqu'à 10MB</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isHeroSection && sectionData.map((item, index) => (
                            <div key={item.id || index} className="flex flex-col sm:flex-none sm:block col-span-full ring-1 ring-slate-300 p-4 rounded-lg shadow-default">
                                {'name' in item && (
                                    <>
                                        <div className="flex items-center gap-x-2">
                                            <label htmlFor={`name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
                                            {renderCadenasFree()}
                                        </div>
                                        <input
                                            type="text"
                                            id={`name-${index}`}
                                            value={item.name}
                                            onChange={(e) => handleInputChange(e, sectionName, index, 'name')}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </>
                                )}
                                {'title' in item && (
                                    <>
                                        <div className="mb-1 flex items-center mt-4 gap-x-2">
                                            <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                                            {renderCadenasFree()}
                                        </div>
                                        <input
                                            type="text"
                                            id={`title-${index}`}
                                            value={item.title}
                                            onChange={(e) => handleInputChange(e, sectionName, index, 'title')}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </>
                                )}
                                {'description' in item && (
                                    <>
                                        <div className="mb-1 flex items-center mt-4 gap-x-2">
                                            <label htmlFor={`description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                            {renderCadenasFree()}
                                        </div>
                                        <textarea
                                            id={`description-${index}`}
                                            value={item.description}
                                            onChange={(e) => handleInputChange(e, sectionName, index, 'description')}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </>
                                )}
                                {'price' in item && (
                                    <>
                                        <div className="mb-1 flex items-center mt-4 gap-x-2">
                                            <label htmlFor={`price-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Prix</label>
                                            {renderCadenasFree()}
                                        </div>
                                        <input
                                            type="text"
                                            id={`price-${index}`}
                                            value={item.price}
                                            onChange={(e) => handleInputChange(e, sectionName, index, 'price')}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </>
                                )}
                                {sectionName === 'menusPrices' && (
                                    <>
                                        <div className='mt-8'>
                                            <div className='flex flex-col sm:flex-row items-start gap-x-2'>
                                                <label className="mb-2 sm:mb-0 text-sm font-medium leading-6 text-gray-900">
                                                    Caractéristiques
                                                </label>
                                                <div className='flex gap-x-2 mb-2'>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddFeature(sectionName, index)}
                                                        className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ${!isClickable && 'pointer-events-none'}`}
                                                    >
                                                        Ajouter +
                                                    </button>
                                                    {renderCadenasPremium()}
                                                </div>
                                            </div>
                                        </div>
                                        {item.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex flex-col sm:flex-row col-span-full gap-x-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(e, sectionName, index, featureIndex)}
                                                    className="px-2 flex-grow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                                                />
                                                <div className='flex gap-x-2 items-center justify-start mb-4 sm:mb-2'>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(sectionName, index, featureIndex)}
                                                        className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 ${!isClickable && 'pointer-events-none'}`}
                                                    >
                                                        Supprimer
                                                    </button>
                                                    {renderCadenasPremium()}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {'imageUrl' in item && (
                                    <div className="col-span-full">
                                        <div className="mb-1 flex items-center mt-4">
                                            <label htmlFor={`cover-photo-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                Image
                                            </label>
                                        </div>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <img
                                                    src={temporaryImages[`${sectionName}-${index}`] || item.imageUrl}
                                                    alt="Current"
                                                    className="mx-auto h-52 w-52 rounded-md object-cover shadow-default"
                                                />
                                                <div className="mt-4 flex flex-col sm:flex-row text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor={`file-upload-${index}`}
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Changer d'image</span>
                                                        <input id={`file-upload-${index}`} name={`file-upload-${index}`} type="file" className="sr-only" onChange={(e) => handleImageChange(e, index)} />
                                                    </label>
                                                    <p className="pl-1">ou glisser déposer</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP jusqu'à 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='flex gap-x-2 mt-4'>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(sectionName, index)}
                                        className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 ${!isClickable && 'pointer-events-none'}`}
                                    >
                                        Supprimer cet élément
                                    </button>
                                    {renderCadenasPremium()}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!isHeroSection && sectionName !== 'menusPrices' && (
                        <div className="flex items-center mt-6 gap-x-2">
                            <button
                                type="button"
                                onClick={() => handleAddItem(sectionName)}
                                className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ${!isClickable && 'pointer-events-none'}`}
                            >
                                Ajouter un nouvel élément
                            </button>
                            {renderCadenasPremium()}
                        </div>
                    )}
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

export default MenuSectionForm;
