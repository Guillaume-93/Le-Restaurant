// src/components/admin/FeatureInput.js
"use client";

export default function FeatureInput({ features, sectionName, itemIndex, onAddFeature, onRemoveFeature, onChangeFeature }) {
    // console.log("Features avant l'ajout : ", features);

    return (
        <>
            <div className='mt-8'>
                <div className='flex items-start gap-x-2'>
                    <label className="mb-2 sm:mb-0 text-sm font-medium leading-6 text-gray-900">
                        Caractéristiques
                    </label>
                    <div className='flex gap-x-2 mb-2'>
                        <button
                            type="button"
                            onClick={() => onAddFeature(sectionName, itemIndex)}
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex col-span-full gap-x-2">
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
                            className=" text-red-600 hover:text-red-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

