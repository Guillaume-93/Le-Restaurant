// src/components/admin/ImageUpload.js
"use client";

import Loader from '@/components/Loader/Loader';
import { showToast } from '@/components/ui/ToastManager.js';
import Image from 'next/image.js';
import { useEffect, useState } from 'react';

export default function ImageUpload({ sectionName, index, imageUrl, onImageChange, imageIndex }) {
    const [temporaryImage, setTemporaryImage] = useState(imageUrl || '/images/no-image.webp');
    const [loading, setLoading] = useState(!imageUrl);

    useEffect(() => {
        if (imageUrl) {
            setTemporaryImage(imageUrl);
            setLoading(false); // Arrêter le chargement une fois que l'image est définie
        }
    }, [imageUrl]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
            if (!validImageTypes.includes(file.type)) {
                showToast('Erreur !', 'Seuls les fichiers PNG, JPG, WEBP, HEIC et HEIF sont acceptés.', 'error');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                showToast('Erreur !', 'La taille du fichier doit être inférieure à 10MB.', 'error');
                return;
            }

            setLoading(true); // Démarrer le chargement pendant le téléchargement de l'image

            let convertedFile = file;

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
                        setLoading(false);
                        return;
                    }
                }
            }

            const newImageUrl = URL.createObjectURL(convertedFile);
            setTemporaryImage(newImageUrl);
            await onImageChange(convertedFile, index, sectionName, imageIndex);
            setLoading(false); // Arrêter le chargement une fois que l'image est téléchargée
        }
    };

    return (
        <div className="col-span-full">
            <div className={`mb-1 flex items-center mt-1`}>
                <label htmlFor={`cover-photo-${imageIndex !== undefined ? imageIndex : index}`} className={`block text-sm font-medium leading-6 text-gray-900 ${sectionName === 'heroSection', 'carousel' ? 'hidden' : ''}`}>
                    Image
                </label>
            </div>
            <div className={`flex justify-center rounded-lg border border-dashed border-gray-900/25 ${sectionName === 'heroSection' ? 'py-2' : 'px-6 py-10'}`}>
                <div className="text-center">
                    {loading ? (
                        <div className={`mx-auto  rounded-md object-cover shadow-default ${sectionName === 'heroSection' ? 'h-20 w-20' : 'h-52 w-52'}`}>
                            <Loader />
                        </div>
                    ) : (
                        <Image
                            src={temporaryImage}
                            alt={`Current ${imageIndex !== undefined ? imageIndex + 1 : ''}`}
                            className={`mx-auto  rounded-md object-cover shadow-default ${sectionName === 'heroSection' ? 'h-20 w-20' : 'h-52 w-52'}`}
                            width={200}
                            height={200}
                            priority={true}
                        />
                    )}
                    <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                        <label
                            htmlFor={`file-upload-${imageIndex !== undefined ? imageIndex : index}`}
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Changer d&apos;image</span>
                            <input id={`file-upload-${imageIndex !== undefined ? imageIndex : index}`} name={`file-upload-${imageIndex !== undefined ? imageIndex : index}`} type="file" className="sr-only" onChange={handleImageChange} />
                        </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP jusqu&apos;à 10MB</p>
                </div>
            </div>
        </div>
    );
}
