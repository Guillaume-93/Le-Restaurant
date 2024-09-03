"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Marquee from "@/components/magicui/Marquee.jsx";
import { cn } from "@/lib/utils";
import { StarSolid } from 'iconoir-react';

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
                    }));

                    setTestimonials(structuredReviews);
                }
            } catch (error) {
                console.error('Failed to fetch Google reviews:', error);
            }
        };

        fetchGoogleReviews();
    }, []);

    const ReviewCard = ({ img, name, rating, body, date }) => (
        <figure
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border p-4",
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
                        {[...Array(rating)].map((_, i) => (
                            <StarSolid key={i} aria-hidden="true" className="h-4 w-4 flex-none text-yellow-500" />
                        ))}
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
                    <div className="mx-auto max-w-xl text-center px-2">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#112E34]">
                            Avis
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Des centaines de clients satisfaits ont partagé des moments inoubliables chez nous
                        </p>
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
                        {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-800"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-800"></div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
