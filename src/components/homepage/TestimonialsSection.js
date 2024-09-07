"use client";
import RatingBox from "@/components/homepage/RatingBox.js";
import Marquee from "@/components/magicui/Marquee.jsx";
import { cn } from "@/lib/utils";
import { StarSolid } from 'iconoir-react';
import Image from "next/image";
import { useEffect, useState } from "react";

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const CACHE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 jours

    useEffect(() => {
        const fetchGoogleReviews = async () => {
            const cachedReviews = localStorage.getItem('google-reviews');
            const cacheTimestamp = localStorage.getItem('google-reviews-timestamp');
            const now = Date.now();
    
            // Vérifier si le cache est encore valide
            if (cachedReviews && cacheTimestamp && now - cacheTimestamp < CACHE_EXPIRATION) {
                setTestimonials(JSON.parse(cachedReviews));
            } else {
                try {
                    const response = await fetch('/api/google-reviews');
                    const reviews = await response.json();
    
                    if (reviews.length > 0) {
                        const structuredReviews = reviews.map((review) => ({
                            body: review.text,
                            name: review.author_name,
                            rating: review.rating,
                            date: review.relative_time_description,
                            img: review.profile_photo_url || '/images/avatars/default-avatar.webp',
                            userReviewsCount: review.user_ratings_total || 0,
                        }));
    
                        // Stocker les avis et l'horodatage dans localStorage
                        localStorage.setItem('google-reviews', JSON.stringify(structuredReviews));
                        localStorage.setItem('google-reviews-timestamp', now.toString());
    
                        setTestimonials(structuredReviews);
                    }
                } catch (error) {
                    console.error('Failed to fetch Google reviews:', error);
                }
            }
        };
    
        fetchGoogleReviews();
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
            </div>
        );
    };

    const ReviewCard = ({ img, name, rating, body, date }) => (
        <figure
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border p-4 shadow-default",
                "border-gray-950/[.1] bg-white",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
                "max-w-xs h-fit"
            )}
        >
            <div className="flex items-center gap-2">
                <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    alt={name}
                    src={img}
                    loading="lazy"
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <div className="flex items-center">
                        {renderStars(rating)}
                    </div>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">
                {body}
            </blockquote>
        </figure>
    );

    return (
        <div className="relative isolate mt-24 sm:pt-24">
            <div className="relative py-20">
                <div className="relative mx-auto max-w-7xl">
                    <div className="mx-auto max-w-xl text-center px-6">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#112E34]">
                            Avis
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Des centaines de clients satisfaits ont partagé des moments inoubliables chez nous
                        </p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <RatingBox />  {/* Ici, vous intégrez le composant de note globale */}
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent dark:bg-transparent mt-16">
                        <Marquee pauseOnHover className="[--duration:35s]">
                            {testimonials.map((testimonial) => (
                                <ReviewCard key={testimonial.name} {...testimonial} />
                            ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="[--duration:35s]">
                            {testimonials.map((testimonial) => (
                                <ReviewCard key={testimonial.name} {...testimonial} />
                            ))}
                        </Marquee>
                        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#ffffff] dark:from-background"></div>
                        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#ffffff] dark:from-background"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
