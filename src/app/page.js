// app/page.js

import Faq from "@/components/homepage/Faq.js";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import MenusPrices from "@/components/homepage/MenusPrices";
import SecondaryFeaturesSection from "@/components/homepage/SecondaryFeaturesSection";
import React, { Suspense } from 'react';

export default function Example() {
    const DishesCarousel = React.lazy(() => import('@/components/homepage/DishesCarousel'));
    const TestimonialsSection = React.lazy(() => import('@/components/homepage/TestimonialsSection'));

    return (
        <div>
            <main>
                <HeroSection />
                <FeaturesSection />
                <Suspense fallback={<div>Loading...</div>}>
                    <DishesCarousel />
                </Suspense>
                <MenusPrices />
                <SecondaryFeaturesSection />
                <Suspense fallback={<div>Loading...</div>}>
                    <TestimonialsSection />
                </Suspense>
                <Faq />
            </main>
        </div>
    );
}
