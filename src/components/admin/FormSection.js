"use client";

import FeatureInput from './FeatureInput';
import ImageUpload from './ImageUpload';

export default function FormSection({
    item,
    sectionName,
    index,
    onInputChange,
    onRemoveItem,
    onImageChange,
    onAddFeature,
    onRemoveFeature,
    onChangeFeature
}) {
    return (
        <div key={item.id || index} className="flex flex-col sm:flex-none sm:block col-span-full ring-1 ring-slate-300 p-4 rounded-lg shadow-default">
            {sectionName === 'heroSection' ? (
                <>
                    <div className="mb-1 flex items-center gap-x-2">
                        <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                    </div>
                    <input
                        type="text"
                        id={`title-${index}`}
                        value={item.title}
                        onChange={(e) => onInputChange(e, 'title')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                        <label htmlFor={`subtitle-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Sous-titre</label>
                    </div>
                    <textarea
                        id={`subtitle-${index}`}
                        value={item.subtitle}
                        onChange={(e) => onInputChange(e, 'subtitle')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                        <label htmlFor={`buttonText1-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Texte du Bouton 1</label>
                    </div>
                    <input
                        type="text"
                        id={`buttonText1-${index}`}
                        value={item.buttonText1}
                        onChange={(e) => onInputChange(e, 'buttonText1')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                        <label htmlFor={`buttonLink1-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Lien du Bouton 1</label>
                    </div>
                    <input
                        type="text"
                        id={`buttonLink1-${index}`}
                        value={item.buttonLink1}
                        onChange={(e) => onInputChange(e, 'buttonLink1')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                        <label htmlFor={`buttonText2-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Texte du Bouton 2</label>
                    </div>
                    <input
                        type="text"
                        id={`buttonText2-${index}`}
                        value={item.buttonText2}
                        onChange={(e) => onInputChange(e, 'buttonText2')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                        <label htmlFor={`buttonLink2-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Lien du Bouton 2</label>
                    </div>
                    <input
                        type="text"
                        id={`buttonLink2-${index}`}
                        value={item.buttonLink2}
                        onChange={(e) => onInputChange(e, 'buttonLink2')}
                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {item.images && item.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative">
                                    <ImageUpload
                                        sectionName={sectionName}
                                        index={index}
                                        imageIndex={imageIndex}
                                        imageUrl={image.src}
                                        onImageChange={onImageChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {'name' in item && (
                        <>
                            <div className="flex items-center gap-x-2">
                                <label htmlFor={`name-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Nom</label>
                            </div>
                            <input
                                type="text"
                                id={`name-${index}`}
                                value={item.name}
                                onChange={(e) => onInputChange(e, 'name', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </>
                    )}
                    {'title' in item && (
                        <>
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                            </div>
                            <input
                                type="text"
                                id={`title-${index}`}
                                value={item.title}
                                onChange={(e) => onInputChange(e, 'title', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </>
                    )}
                    {'description' in item && (
                        <>
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            </div>
                            <textarea
                                id={`description-${index}`}
                                value={item.description}
                                onChange={(e) => onInputChange(e, 'description', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </>
                    )}
                    {'price' in item && (
                        <>
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`price-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Prix</label>
                            </div>
                            <input
                                type="text"
                                id={`price-${index}`}
                                value={item.price}
                                onChange={(e) => onInputChange(e, 'price', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </>
                    )}
                    {sectionName === 'menusPrices' && (
                        <FeatureInput
                            features={item.features || []}
                            sectionName={sectionName}
                            itemIndex={index}
                            onAddFeature={onAddFeature}
                            onRemoveFeature={onRemoveFeature}
                            onChangeFeature={onChangeFeature}
                        />
                    )}
                    {'imageUrl' in item && (
                        <ImageUpload
                            sectionName={sectionName}
                            index={index}
                            imageUrl={item.imageUrl}
                            onImageChange={onImageChange}
                        />
                    )}
                </>
            )}
            <div className='flex gap-x-2 mt-4'>
                <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                >
                    Supprimer cet élément
                </button>
            </div>
        </div>
    );
}
