// app/page.js

import DishesCarousel from "@/components/homepage/DishesCarousel";
import Faq from "@/components/homepage/Faq.js";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import MenusPrices from "@/components/homepage/MenusPrices";
import SecondaryFeaturesSection from "@/components/homepage/SecondaryFeaturesSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";

export default function Example() {
    return (
        <div>
            <main>
                <HeroSection />
                <FeaturesSection />
                <DishesCarousel />
                <MenusPrices />
                <SecondaryFeaturesSection />
                <TestimonialsSection />
                <Faq />
            </main>
        </div>
    );
}
