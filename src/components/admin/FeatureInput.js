// src/components/admin/FeatureInput.js
"use client";

export default function FeatureInput({ features, sectionName, itemIndex, onAddFeature, onRemoveFeature, onChangeFeature }) {
    return (
        <>
            <div className='mt-8'>
                <div className='flex flex-col sm:flex-row items-start gap-x-2'>
                    <label className="mb-2 sm:mb-0 text-sm font-medium leading-6 text-gray-900">
                        Caractéristiques
                    </label>
                    <div className='flex gap-x-2 mb-2'>
                        <button
                            type="button"
                            onClick={() => onAddFeature(sectionName, itemIndex)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                        >
                            Ajouter +
                        </button>
                    </div>
                </div>
            </div>
            {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex flex-col sm:flex-row col-span-full gap-x-2">
                    <input
                        type="text"
                        value={feature}
                        onChange={(e) => onChangeFeature(e, sectionName, itemIndex, featureIndex)}
                        className="px-2 flex-grow block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
                    />
                    <div className='flex gap-x-2 items-center justify-start mb-4 sm:mb-2'>
                        <button
                            type="button"
                            onClick={() => onRemoveFeature(sectionName, itemIndex, featureIndex)}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
