"use client";
import { StarSolid } from 'iconoir-react';
import { useState, useEffect } from "react";
import Image from "next/image";

const RatingSummaryBox = () => {
    const [globalRating, setGlobalRating] = useState(4.7);
    const [totalReviews, setTotalReviews] = useState(81);
    const [criteriaRatings, setCriteriaRatings] = useState({
        service: 4.6,
        ambiance: 4.7,
        cuisine: 4.8,
        qualityPrice: 4.5
    });

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
        <div className="bg-white p-6 rounded-lg shadow-default w-72 mt-6 border border-gray-950/[.1]">
            <div className="text-center mb-4">
                <p className='font-semibold text-xl mb-2'>Excellent</p>
                <div className="text-4xl font-bold text-gray-800">{globalRating}</div>
                <div className="flex justify-center items-center mt-1">
                    {renderStars(globalRating)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                    <p>
                        Basé sur <span className='font-bold'>{totalReviews} avis</span>
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                        alt="Logo Google"
                        width={60}
                        height={20}
                        className="w-20 h-auto"
                    />
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
        </div>
    );
};

export default RatingSummaryBox;
