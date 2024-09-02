// app/page.js

import DishesCarousel from "@/components/homepage/DishesCarousel";
import Faq from "@/components/homepage/Faq.js";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import MenusPrices from "@/components/homepage/MenusPrices";
import SecondaryFeaturesSection from "@/components/homepage/SecondaryFeaturesSection";
import SpecialMenu from "@/components/homepage/SpecialMenu.js";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
// import TestimonialsTest from "@/components/homepage/TestimonialsTest";

export default function Example() {
    return (
        <div>
            <main>
                <HeroSection />
                <FeaturesSection />
                <DishesCarousel />
                <MenusPrices />
                <SpecialMenu />
                <SecondaryFeaturesSection />
                <TestimonialsSection />
                {/* <TestimonialsTest /> */}
                <Faq />
            </main>
        </div>
    );
}
