// pages/index.js

import DishesCarousel from "@/components/DishesCarousel";
import Faq from "@/components/Faq.js";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import MenusPrices from "@/components/MenusPrices";
import SecondaryFeaturesSection from "@/components/SecondaryFeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Layout from "../app/layout";

export default function Example() {
  return (
    <Layout>
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
    </Layout>
  );
}
