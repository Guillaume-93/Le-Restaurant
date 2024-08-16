// components/MenuSectionForm.js

import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

function MenuSectionForm({
    sectionData,
    sectionName,
    handleInputChange,
    handleSubmit,
    setMenuData,
    handleAddItem,
    handleRemoveItem,
    menuData,
}) {
    const [temporaryImages, setTemporaryImages] = useState({});
    const [filesToUpload, setFilesToUpload] = useState({});

    useEffect(() => {
        setTemporaryImages({});
        setFilesToUpload({});
    }, [sectionName]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
    
            // Affiche l'image temporaire
            setTemporaryImages(prevState => ({
                ...prevState,
                [`${sectionName}-${index}`]: imageUrl,
            }));
    
            // Stocke le fichier à télécharger
            setFilesToUpload(prevState => ({
                ...prevState,
                [`${sectionName}-${index}`]: file,
            }));
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
    
        const session = await getSession();
        if (!session) {
            toast.error('Votre session a expiré. Veuillez vous reconnecter.');
            signIn();
            return;
        }
    
        // Vérifiez d'abord si des images doivent être téléchargées
        const formData = new FormData();
        Object.keys(filesToUpload).forEach(key => {
            formData.append('image', filesToUpload[key]);
            formData.append('section', sectionName);
            formData.append('index', key.split('-')[1]);
        });
    
        // Upload des images
        if (Object.keys(filesToUpload).length > 0) {
            const uploadResponse = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
    
            if (uploadResponse.ok) {
                const data = await uploadResponse.json();
                // console.log('Images uploaded:', data);
    
                // Mettez à jour `menuData` avec les nouvelles URLs des images
                data.images.forEach((image, i) => {
                    const section = sectionName;
                    const index = Object.keys(filesToUpload)[i].split('-')[1];
                    setMenuData(prevData => {
                        const updatedSection = [...prevData[section]];
                        updatedSection[index].imageUrl = image.imageUrl;
                        return { ...prevData, [section]: updatedSection };
                    });
                });
            } else {
                console.error('Échec du téléchargement des images.');
                toast.error('Échec du téléchargement des images.');
                return;
            }
        }
    
        // Envoyer ensuite les données réelles du formulaire
        const saveResponse = await fetch('/api/menu-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(menuData),
        });
    
        if (saveResponse.ok) {
            toast.success('Données sauvegardées avec succès !');
        } else {
            console.error('Échec de la sauvegarde des données.');
            toast.error('Échec de la sauvegarde des données.');
        }
    };

    return (
        <form onSubmit={handleSave} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-12">
                <div className="flex flex-col sm:flex-none sm:block border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">{sectionName}</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {sectionData.map((item, index) => (
                            <div key={item.id || index} className="flex flex-col sm:flex-none sm:block col-span-full ring-1 ring-slate-300 p-4 rounded-lg shadow-default">
                                {'name' in item && (
                                    <>
                                        <label htmlFor={`name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
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
                                        <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
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
                                        <label htmlFor={`description-${index}`} className="block text-sm font-medium leading-6 text-gray-900 mt-4">Description</label>
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
                                        <label htmlFor={`price-${index}`} className="block text-sm font-medium leading-6 text-gray-900 mt-4">Prix</label>
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
                                        <div className='flex items-center mt-8 mb-2'>
                                            <label className="text-sm font-medium leading-6 text-gray-900">
                                                Caractéristiques
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => handleAddFeature(sectionName, index)}
                                                className="ml-2 px-2 py-0.5 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900"
                                            >
                                                Ajouter +
                                            </button>
                                        </div>
                                        {item.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex flex-col sm:flex-row col-span-full gap-x-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(e, sectionName, index, featureIndex)}
                                                    className="px-2 flex-grow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFeature(sectionName, index, featureIndex)}
                                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 mb-6 sm:mb-2"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {'imageUrl' in item && (
                                    <div className="col-span-full">
                                        <label htmlFor={`cover-photo-${index}`} className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                            Image
                                        </label>
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
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(sectionName, index)}
                                    className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Supprimer cet élément
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleAddItem(sectionName)}
                        className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ajouter un nouvel élément
                    </button>
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
