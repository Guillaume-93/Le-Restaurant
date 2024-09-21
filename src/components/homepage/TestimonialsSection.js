// "use client";
// import RatingBox from "@/components/homepage/RatingBox.js";
// import Marquee from "@/components/magicui/Marquee.jsx";
// import { cn } from "@/lib/utils";
// import { StarSolid } from 'iconoir-react';
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const TestimonialsSection = () => {
//     const [testimonials, setTestimonials] = useState([]);
//     const CACHE_EXPIRATION = 30 * 24 * 60 * 60 * 1000; // 30 jours

//     useEffect(() => {
//         const fetchGoogleReviews = async () => {
//             const cachedReviews = localStorage.getItem('google-reviews');
//             const cacheTimestamp = localStorage.getItem('google-reviews-timestamp');
//             const now = Date.now();

//             // Vérifier si le cache est encore valide
//             if (cachedReviews && cacheTimestamp && now - cacheTimestamp < CACHE_EXPIRATION) {
//                 setTestimonials(JSON.parse(cachedReviews));
//             } else {
//                 try {
//                     const response = await fetch('/api/google-reviews');
//                     const reviews = await response.json();

//                     if (reviews.length > 0) {
//                         const structuredReviews = reviews.map((review) => ({
//                             body: review.text,
//                             name: review.author_name,
//                             rating: review.rating,
//                             date: review.relative_time_description,
//                             img: review.profile_photo_url || '/images/avatars/default-avatar.webp',
//                             userReviewsCount: review.user_ratings_total || 0,
//                         }));

//                         // Stocker les avis et l'horodatage dans localStorage
//                         localStorage.setItem('google-reviews', JSON.stringify(structuredReviews));
//                         localStorage.setItem('google-reviews-timestamp', now.toString());

//                         setTestimonials(structuredReviews);
//                     }
//                 } catch (error) {
//                     console.error('Failed to fetch Google reviews:', error);
//                 }
//             }
//         };

//         fetchGoogleReviews();
//     }, []);

//     const renderStars = (rating) => {
//         return (
//             <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => {
//                     const filledWidth = Math.min(Math.max(rating - i, 0), 1) * 100;
//                     return (
//                         <div key={i} className="relative">
//                             <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${filledWidth}%` }}>
//                                 <StarSolid className="h-4 w-4 text-yellow-500" />
//                             </div>
//                             <StarSolid className="h-4 w-4 text-gray-300" />
//                         </div>
//                     );
//                 })}
//             </div>
//         );
//     };

//     const ReviewCard = ({ img, name, rating, body, date }) => (
//         <figure
//             className={cn(
//                 "relative cursor-pointer overflow-hidden rounded-xl border p-4 shadow-default",
//                 "border-gray-950/[.1] bg-white",
//                 "dark:border-gray-50/[.1] dark:bg-gray-50/[.10]",
//                 "max-w-xs h-fit"
//             )}
//         >
//             <div className="flex items-center gap-2">
//                 <Image
//                     className="rounded-full"
//                     width={32}
//                     height={32}
//                     alt={name}
//                     src={img}
//                     loading="lazy"
//                 />
//                 <div className="flex flex-col">
//                     <figcaption className="text-sm font-medium dark:text-white">
//                         {name}
//                     </figcaption>
//                     <div className="flex items-center">
//                         {renderStars(rating)}
//                     </div>
//                 </div>
//                 <div className="absolute top-2 right-2">
//                     <Image
//                         src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
//                         alt="Logo Google"
//                         width={24}
//                         height={24}
//                         className="w-6 h-6"
//                     />
//                 </div>
//             </div>
//             <blockquote className="mt-2 text-sm">
//                 {body}
//             </blockquote>
//         </figure>
//     );

//     return (
//         <div className="relative isolate mt-24 sm:py-24">
//             <div className="relative py-20">
//                 <div className="relative mx-auto max-w-7xl">
//                     <div className="mx-auto max-w-xl text-center px-6">
//                         <h2 className="text-lg font-semibold leading-8 tracking-tight text-[#112E34]">
//                             Avis
//                         </h2>
//                         <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
//                             Des centaines de clients satisfaits ont partagé des moments inoubliables chez nous
//                         </p>
//                     </div>
//                     <div className="flex justify-center mt-6">
//                         <RatingBox />  {/* Ici le composant de note globale */}
//                     </div>
//                     <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent dark:bg-transparent mt-16">
//                         <Marquee pauseOnHover className="[--duration:35s]">
//                             {testimonials.map((testimonial) => (
//                                 <ReviewCard key={testimonial.name} {...testimonial} />
//                             ))}
//                         </Marquee>
//                         <Marquee reverse pauseOnHover className="[--duration:35s]">
//                             {testimonials.map((testimonial) => (
//                                 <ReviewCard key={testimonial.name} {...testimonial} />
//                             ))}
//                         </Marquee>
//                         <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#ffffff] dark:from-background"></div>
//                         <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#ffffff] dark:from-background"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TestimonialsSection;

"use client";
import RatingBox from "@/components/homepage/RatingBox.js";
import Marquee from "@/components/magicui/Marquee.jsx";
import { cn } from "@/lib/utils";
import { StarSolid } from 'iconoir-react';
import Image from "next/image";
import { useEffect, useState } from "react";

const TestimonialsSection = () => {
    // Tableau des avis en dur, remplaçant le fetch API
    const hardcodedTestimonials = [
        {
            body: "Un endroit absolument fantastique. Le cadre est chaleureux et convivial, parfait pour un repas entre amis ou en famille. Les plats sont délicieux et préparés avec soin. Service rapide et très professionnel. À recommander sans hésitation !",
            name: "Lucas Dupont",
            rating: 5,
            date: "1 mois",
            img: "/images/avatars/uifaces-popular-image-_1_.webp",
            userReviewsCount: 12,
        },
        {
            body: "Première visite dans ce restaurant et je suis conquis ! La cuisine est exquise, les portions généreuses, et le service impeccable. Le personnel est attentionné et nous a très bien accueillis. Une adresse à garder précieusement.",
            name: "Sofian Martin",
            rating: 5,
            date: "2 mois",
            img: "/images/avatars/uifaces-popular-image-_2_.webp",
            userReviewsCount: 7,
        },
        {
            body: "Une expérience incroyable ! L'ambiance est cosy, le personnel est aux petits soins et les plats sont d'une qualité exceptionnelle. Les saveurs sont au rendez-vous à chaque bouchée. Je reviendrai sans aucun doute !",
            name: "Karim Leblanc",
            rating: 5,
            date: "3 mois",
            img: "/images/avatars/uifaces-popular-image-_3_.webp",
            userReviewsCount: 15,
        },
        {
            body: "Le cadre est très agréable et apaisant. La nourriture est délicieuse avec des ingrédients frais et bien cuisinés. Le personnel est très accueillant et attentionné. Parfait pour une soirée en amoureux ou entre amis.",
            name: "Mohamed Moreau",
            rating: 4,
            date: "1 mois",
            img: "/images/avatars/uifaces-popular-image-_4_.webp",
            userReviewsCount: 20,
        },
        {
            body: "Une ambiance chaleureuse et conviviale avec un service attentionné. Les plats sont succulents et bien présentés. Un excellent rapport qualité-prix. Ce restaurant mérite d'être découvert !",
            name: "Samuel Durand",
            rating: 5,
            date: "4 mois",
            img: "/images/avatars/uifaces-popular-image-_5_.webp",
            userReviewsCount: 8,
        },
        {
            body: "Un petit coin de paradis pour les amateurs de bonne cuisine ! Le personnel est accueillant et souriant. La carte propose des plats variés et tous plus délicieux les uns que les autres. C’est une vraie découverte, j’y reviendrai très vite.",
            name: "Mélanie Bernard",
            rating: 5,
            date: "2 mois",
            img: "/images/avatars/uifaces-popular-image-_6_.webp",
            userReviewsCount: 5,
        },
        {
            body: "Très belle découverte. Un restaurant moderne et cosy, où l'on se sent bien dès l'entrée. Les plats sont gourmands, copieux, et de qualité. Le personnel est attentionné et souriant. À essayer absolument !",
            name: "Christophe Lefèvre",
            rating: 5,
            date: "5 mois",
            img: "/images/avatars/uifaces-popular-image-_7_.webp",
            userReviewsCount: 9,
        },
        {
            body: "Un service impeccable, des plats délicieux, et une ambiance agréable. C'est toujours un plaisir de venir ici, je n'ai jamais été déçu. Très bon rapport qualité/prix, je recommande chaudement.",
            name: "Céline Girard",
            rating: 4,
            date: "6 mois",
            img: "/images/avatars/uifaces-popular-image-_8_.webp",
            userReviewsCount: 4,
        },
        {
            body: "C'est un lieu parfait pour un déjeuner ou un dîner en famille. Le service est rapide, les plats sont délicieux et les portions généreuses. Une adresse que je recommande pour tous les amateurs de bonne cuisine !",
            name: "Nathan Rousseau",
            rating: 5,
            date: "3 mois",
            img: "/images/avatars/uifaces-popular-image-_9_.webp",
            userReviewsCount: 3,
        },
        {
            body: "Une belle découverte. Un restaurant où l'on se sent comme chez soi, avec une cuisine savoureuse et un personnel charmant. Les plats sont bien préparés et les prix sont raisonnables. Je reviendrai avec plaisir.",
            name: "Amélie Dubois",
            rating: 5,
            date: "7 mois",
            img: "/images/avatars/uifaces-popular-image-_10_.webp",
            userReviewsCount: 6,
        },
    ];
    

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
                    <figcaption className="text-sm font-medium">
                        {name}
                    </figcaption>
                    <div className="flex items-center">
                        {renderStars(rating)}
                    </div>
                </div>
                <div className="absolute top-2 right-2">
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Logo Google"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                    />
                </div>
            </div>
            <blockquote className="mt-2 text-sm">
                {body}
            </blockquote>
        </figure>
    );

    return (
        <div className="relative isolate mt-24 sm:py-24">
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
                        <RatingBox />  {/* Ici le composant de note globale */}
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent dark:bg-transparent mt-16">
                        <Marquee pauseOnHover className="[--duration:35s]">
                            {hardcodedTestimonials.map((testimonial) => (
                                <ReviewCard key={testimonial.name} {...testimonial} />
                            ))}
                        </Marquee>
                        <Marquee reverse pauseOnHover className="[--duration:35s]">
                            {hardcodedTestimonials.map((testimonial) => (
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
