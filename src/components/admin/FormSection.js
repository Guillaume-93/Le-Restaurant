"use client";

import FeatureInput from './FeatureInput';
import ImageUpload from './ImageUpload';
import IncludedFeatureInput from './IncludedFeatureInput';

export default function FormSection({
    item,
    sectionName,
    index,
    onInputChange,
    onRemoveItem,
    onImageChange,
    onAddFeature,
    onRemoveFeature,
    onChangeFeature,
    onAddIncludedFeature,
    onRemoveIncludedFeature,
    onChangeIncludedFeature
}) {
    return (
        <div key={item.id || index} className={`relative ring-1 ring-slate-300 p-4 rounded-lg shadow-default ${sectionName === 'heroSection' || sectionName === 'specialMenu' ? 'grid grid-cols-1 lg:grid-cols-3 col-span-full gap-x-4' : 'sm:col-span-3 md:col-span-3 lg:col-span-2 flex flex-col sm:flex-none sm:block'}`}>
            {(sectionName !== 'menusPrices' && sectionName !== 'heroSection' && sectionName !== 'specialMenu') && (
                <button
                    type="button"
                    onClick={() => onRemoveItem(index)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </button>
            )}
            {sectionName === 'heroSection' ? (

                <>
                    <div className='col-span-full'>
                        <div className="mb-1 flex items-center gap-x-2">
                            <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                        </div>
                        <input
                            type="text"
                            id={`title-${index}`}
                            value={item.title}
                            onChange={(e) => onInputChange(e, 'title')}
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <div className="sm:col-span-3">
                            <label htmlFor={`titleColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur du titre</label>
                            <input
                                type="color"
                                id={`titleColor-${index}`}
                                value={item.titleColor || '#FFFFFF'}
                                onChange={(e) => onInputChange(e, 'titleColor', index)}
                                className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-1 flex items-center mt-4 gap-x-2">
                            <label htmlFor={`subtitle-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Sous-titre</label>
                        </div>
                        <textarea
                            id={`subtitle-${index}`}
                            value={item.subtitle}
                            onChange={(e) => onInputChange(e, 'subtitle', index)}
                            rows={4}
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <label htmlFor={`subtitleColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur du sous-titre</label>
                        <input
                            type="color"
                            id={`subtitleColor-${index}`}
                            value={item.subtitleColor || '#FFFFFF'}
                            onChange={(e) => onInputChange(e, 'subtitleColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />

                        <div className="col-span-full pt-6">
                            <div className="border-t border-gray-200"></div>
                        </div>
                        <div className="col-span-full pt-4">
                            <h3 className="text-md font-semibold leading-6 text-gray-900">Personnalisation des boutons</h3>
                        </div>

                        <label htmlFor={`primaryButtonTextColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur texte bouton principal</label>
                        <input
                            type="color"
                            id={`primaryButtonTextColor-${index}`}
                            value={item.primaryButtonTextColor || '#FFFFFF'}
                            onChange={(e) => onInputChange(e, 'primaryButtonTextColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label htmlFor={`primaryButtonBackgroundColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur fond bouton principal</label>
                        <input
                            type="color"
                            id={`primaryButtonBackgroundColor-${index}`}
                            value={item.primaryButtonBackgroundColor || '#000000'}
                            onChange={(e) => onInputChange(e, 'primaryButtonBackgroundColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label htmlFor={`primaryButtonHoverBackgroundColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur survol bouton principal</label>
                        <input
                            type="color"
                            id={`primaryButtonHoverBackgroundColor-${index}`}
                            value={item.primaryButtonHoverBackgroundColor || '#333333'}
                            onChange={(e) => onInputChange(e, 'primaryButtonHoverBackgroundColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label htmlFor={`secondaryButtonTextColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur texte bouton secondaire</label>
                        <input
                            type="color"
                            id={`secondaryButtonTextColor-${index}`}
                            value={item.secondaryButtonTextColor || '#FFFFFF'}
                            onChange={(e) => onInputChange(e, 'secondaryButtonTextColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <label htmlFor={`secondaryButtonLineColor-${index}`} className="block text-sm font-medium leading-6 text-gray-900 py-1.5">Couleur ligne bouton secondaire</label>
                        <input
                            type="color"
                            id={`secondaryButtonLineColor-${index}`}
                            value={item.secondaryButtonLineColor || '#FFFFFF'}
                            onChange={(e) => onInputChange(e, 'secondaryButtonLineColor', index)}
                            className="h-10 w-full block bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mt-6 sm:mt-0 col-span-1 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 justify-center">
                            {item.images && item.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative">
                                    <ImageUpload
                                        sectionName={sectionName}
                                        index={index}
                                        imageIndex={imageIndex}
                                        imageUrl={image.src}
                                        onImageChange={onImageChange} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sm:col-span-6 mt-6">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Image d&apos;arrière plan</label>
                        <div className="mt-2">
                            <ImageUpload
                                sectionName={sectionName}
                                index={index}
                                imageIndex="background"
                                imageUrl={item.backgroundImage?.src}
                                onImageChange={onImageChange}
                            />
                        </div>
                    </div>
                </>

            ) : sectionName === 'specialMenu' ? (
                <>

                    <div className='col-span-2'>
                        <div className="mb-1 flex items-center gap-x-2">
                            <label htmlFor={`title-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Titre</label>
                        </div>
                        <input
                            type="text"
                            id={`title-${index}`}
                            value={item.title}
                            onChange={(e) => onInputChange(e, 'title')}
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <div className="mb-1 flex items-center mt-4 gap-x-2">
                            <label htmlFor={`description-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        </div>
                        <textarea
                            id={`description-${index}`}
                            value={item.description}
                            onChange={(e) => onInputChange(e, 'description')}
                            rows={4}
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <div className="col-span-2">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`entree-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Entrée</label>
                            </div>
                            <textarea
                                id={`entree-${index}`}
                                value={item.entree}
                                onChange={(e) => onInputChange(e, 'entree')}
                                rows={2}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`plat-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Plat</label>
                            </div>
                            <textarea
                                id={`plat-${index}`}
                                value={item.plat}
                                onChange={(e) => onInputChange(e, 'plat')}
                                rows={2}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`dessert-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Dessert</label>
                            </div>
                            <textarea
                                id={`dessert-${index}`}
                                value={item.dessert}
                                onChange={(e) => onInputChange(e, 'dessert')}
                                rows={2}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                    </div>
                    <div className="mt-6 sm:mt-0 col-span-1 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Image de fond</label>
                        <div className="relative">
                            <ImageUpload
                                sectionName={sectionName}
                                index={index}
                                imageUrl={item.imageUrl}
                                onImageChange={onImageChange} />
                        </div>
                    </div>
                    <IncludedFeatureInput
                        includedFeatures={item.includedFeatures || []}
                        sectionName={sectionName}
                        itemIndex={index}
                        onAddIncludedFeature={onAddIncludedFeature}
                        onRemoveIncludedFeature={onRemoveIncludedFeature}
                        onChangeIncludedFeature={onChangeIncludedFeature}
                    />
                    <div className='pb-16'>
                        <div className="col-span-1">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`note-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Note</label>
                            </div>
                            <input
                                type="text"
                                id={`note-${index}`}
                                value={item.note}
                                onChange={(e) => onInputChange(e, 'note', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="col-span-1">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`price-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Prix</label>
                            </div>
                            <input
                                type="text"
                                id={`price-${index}`}
                                value={item.price}
                                onChange={(e) => onInputChange(e, 'price', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="col-span-1">
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`footerText-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Texte de pied de page</label>
                            </div>
                            <input
                                type="text"
                                id={`footerText-${index}`}
                                value={item.footerText}
                                onChange={(e) => onInputChange(e, 'footerText', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                    {sectionName === 'wineMenu' && (
                        <>
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`year-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Année</label>
                            </div>
                            <input
                                type="text"
                                id={`year-${index}`}
                                value={item.year}
                                onChange={(e) => onInputChange(e, 'year', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`volume-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Volume</label>
                            </div>
                            <input
                                type="text"
                                id={`volume-${index}`}
                                value={item.volume}
                                onChange={(e) => onInputChange(e, 'volume', index)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div className="mb-1 flex items-center mt-4 gap-x-2">
                                <label htmlFor={`category-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
                            </div>
                            <input
                                type="text"
                                id={`category-${index}`}
                                value={item.category.title}
                                onChange={(e) => onInputChange(e, 'category.title', index)}
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
                    {item.infos && (
                        <>
                            {'platDuJour' in item && (
                                <>
                                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                                        <label htmlFor={`platDuJour-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Plat du Jour</label>
                                    </div>
                                    <input
                                        type="text"
                                        id={`platDuJour-${index}`}
                                        value={item.platDuJour}
                                        onChange={(e) => onInputChange(e, 'platDuJour', index)}
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </>
                            )}
                            {'poissonDuJour' in item && (
                                <>
                                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                                        <label htmlFor={`poissonDuJour-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Poisson du Jour</label>
                                    </div>
                                    <input
                                        type="text"
                                        id={`poissonDuJour-${index}`}
                                        value={item.poissonDuJour}
                                        onChange={(e) => onInputChange(e, 'poissonDuJour', index)}
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </>
                            )}
                            {'accompagnements' in item && (
                                <>
                                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                                        <label htmlFor={`accompagnements-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Accompagnements</label>
                                    </div>
                                    <input
                                        type="text"
                                        id={`accompagnements-${index}`}
                                        value={item.accompagnements}
                                        onChange={(e) => onInputChange(e, 'accompagnements', index)}
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </>
                            )}
                            {'desserts' in item && (
                                <>
                                    <div className="mb-1 flex items-center mt-4 gap-x-2">
                                        <label htmlFor={`desserts-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Desserts</label>
                                    </div>
                                    <input
                                        type="text"
                                        id={`desserts-${index}`}
                                        value={item.desserts}
                                        onChange={(e) => onInputChange(e, 'desserts', index)}
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </>
                            )}
                        </>
                    )}
                    {sectionName === 'heroSection' && (
                        <div className="sm:col-span-6 mt-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Image d&apos;arrière plan</label>
                            <div className="mt-2">
                                <ImageUpload
                                    sectionName={sectionName}
                                    index={index}
                                    imageIndex="background"
                                    imageUrl={item.backgroundImage?.src}
                                    onImageChange={onImageChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Alt text"
                                    value={item.backgroundImage?.alt}
                                    onChange={(e) => onInputChange(e, `backgroundImage.alt`, index)}
                                    className="mt-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
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
            <div className="py-6 flex items-start justify-end gap-x-6">
                <div className='absolute bottom-4 right-4 flex gap-x-6'>
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
            </div>
        </div>
    );
}
