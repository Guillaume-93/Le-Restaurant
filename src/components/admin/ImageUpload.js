"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import heic2any from "heic2any"; // Vous devez installer cette librairie: npm install heic2any

export default function ImageUpload({ sectionName, index, imageUrl, onImageChange, imageIndex }) {
    const [temporaryImage, setTemporaryImage] = useState(imageUrl);

    useEffect(() => {
        setTemporaryImage(imageUrl);
    }, [imageUrl]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
            if (!validImageTypes.includes(file.type)) {
                toast.error('Seuls les fichiers PNG, JPG, WEBP, HEIC et HEIF sont acceptés.');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                toast.error('La taille du fichier doit être inférieure à 10MB.');
                return;
            }

            let convertedFile = file;

            // Conversion du format HEIC/HEIF en JPEG
            if (file.type === 'image/heic' || file.type === 'image/heif') {
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

            const newImageUrl = URL.createObjectURL(convertedFile);
            setTemporaryImage(newImageUrl);

            await onImageChange(convertedFile, index, sectionName, imageIndex);
        }
    };

    return (
        <div className="col-span-full">
            <div className="mb-1 flex items-center mt-4">
                <label htmlFor={`cover-photo-${imageIndex !== undefined ? imageIndex : index}`} className="block text-sm font-medium leading-6 text-gray-900">
                    {sectionName === 'heroSection' ? `Image ${imageIndex + 1}` : 'Image'}
                </label>
            </div>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <img
                        src={temporaryImage}
                        alt={`Current ${imageIndex !== undefined ? imageIndex + 1 : ''}`}
                        className="mx-auto h-52 w-52 rounded-md object-cover shadow-default"
                    />
                    <div className="mt-4 flex flex-col sm:flex-row text-sm leading-6 text-gray-600">
                        <label
                            htmlFor={`file-upload-${imageIndex !== undefined ? imageIndex : index}`}
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Changer d&apos;image</span>
                            <input id={`file-upload-${imageIndex !== undefined ? imageIndex : index}`} name={`file-upload-${imageIndex !== undefined ? imageIndex : index}`} type="file" className="sr-only" onChange={handleImageChange} />
                        </label>
                        <p className="pl-1">ou glisser déposer</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP jusqu&apos;à 10MB</p>
                </div>
            </div>
        </div>
    );
}
