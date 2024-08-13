import DishesCarousel from "@/components/DishesCarousel";
import Faq from "@/components/Faq.js";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSectionBis";
import MenusPrices from "@/components/MenusPrices";
import SecondaryFeaturesSection from "@/components/SecondaryFeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Layout from "../app/layout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
