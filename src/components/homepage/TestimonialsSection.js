"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/magicui/Marquee.jsx";
import { cn } from "@/lib/utils";
import { StarSolid } from 'iconoir-react';
import RatingBox from "@/components/homepage/RatingBox.js";

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchGoogleReviews = async () => {
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

                    setTestimonials(structuredReviews);
                }
            } catch (error) {
                console.error('Failed to fetch Google reviews:', error);
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
                // Styles ajustés pour s'adapter au contenu
                "border-gray-950/[.1] bg-white",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
                // Utiliser w-fit et h-fit pour ajuster à la taille du contenu
                "w-fit h-fit max-w-xs sm:max-w-md lg:max-w-lg"
            )}
        >
            <div className="flex items-center gap-2">
                <Image className="rounded-full" width={32} height={32} alt={name} src={img} />
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
            <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {date}
            </figcaption>
        </figure>
    );

    return (
        <div className="relative isolate mt-32 sm:pt-32">
            <div className="relative py-20">
                <Image
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                    src="/images/backgrounds/le-neuilly-pattern-3.webp"
                    alt=""
                    width={1440}
                    height={400}
                />
                <div className="mx-auto">
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
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-transparent dark:bg-transparent mt-16">
                        <Marquee pauseOnHover className="[--duration:20s]">
                            {testimonials.map((testimonial) => (
                                <ReviewCard key={testimonial.name} {...testimonial} />
                            ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="[--duration:20s]">
                            {testimonials.map((testimonial) => (
                                <ReviewCard key={testimonial.name} {...testimonial} />
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
