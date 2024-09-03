"use client";
import { StarSolid } from 'iconoir-react';
import { useState, useEffect } from "react";

const RatingSummaryBox = () => {
    const [globalRating, setGlobalRating] = useState(4.7);
    const [totalReviews, setTotalReviews] = useState(81);
    const [criteriaRatings, setCriteriaRatings] = useState({
        service: 4.6,
        ambiance: 4.7,
        cuisine: 4.8,
        qualityPrice: 4.5
    });

    useEffect(() => {
        // Logique pour récupérer les données depuis une API ou une source de données réelle
        // Pour l'exemple, nous avons utilisé des valeurs en dur
    }, []);

    const renderStars = (rating) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                    const filledWidth = Math.min(Math.max(rating - i, 0), 1) * 100;
                    return (
                        <div key={i} className="relative">
                            <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${filledWidth}%` }}>
                                <StarSolid className="h-4 w-4 text-yellow-500" />
                            </div>
                            <StarSolid className="h-4 w-4 text-gray-300" />
                        </div>
                    );
                })}
                <span className="ml-2 text-sm text-gray-700">{rating.toFixed(1)}/5</span>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-default w-72 mt-6">
            <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-800">{globalRating}</div>
                <div className="flex justify-center items-center mt-1">
                    {renderStars(globalRating)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    <a 
                        href="https://www.google.com/search?q=Le+Neuilly+Avis" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                    >
                        {totalReviews} avis
                    </a>
                </div>
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">Service</span>
                    {renderStars(criteriaRatings.service)}
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">Ambiance</span>
                    {renderStars(criteriaRatings.ambiance)}
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">Cuisine</span>
                    {renderStars(criteriaRatings.cuisine)}
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-700">Qualité/Prix</span>
                    {renderStars(criteriaRatings.qualityPrice)}
                </div>
            </div>
            {/* <div className="mt-4 text-center text-xs text-gray-500">
                100% avis vérifiés
            </div> */}
        </div>
    );
};

export default RatingSummaryBox;
