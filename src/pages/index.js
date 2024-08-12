import Layout from "../app/layout";
import HeroSection from "@/components/HeroSectionBis";
// import LogoCloud from "@/components/LogoCloud";
import FeaturesSection from "@/components/FeaturesSection";
import SecondaryFeaturesSection from "@/components/SecondaryFeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import DishesCarousel from "@/components/DishesCarousel";
import MenusPrices from "@/components/MenusPrices";
import Faq from "@/components/Faq.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Layout>
      <div>
        <main>
          <HeroSection />
          {/* <LogoCloud /> */}
          <FeaturesSection />
          <DishesCarousel />
          <MenusPrices />
          <SecondaryFeaturesSection />
          <StatsSection />
          <TestimonialsSection />
          <Faq />
          {/* <CTASection /> */}
        </main>
      </div>
    </Layout>
  );
}
