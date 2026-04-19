"use client";
import HeroSlider from "@/components/ui/HeroSlider";
import StatsSection from "@/components/ui/StatsSection";
import ToursSection from "@/components/ui/ToursSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import GalleryGrid from "@/components/ui/GalleryGrid";
import FAQSection from "@/components/ui/FAQSection";
import CTASection from "@/components/ui/CTASection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSlider />
      <StatsSection />
      <ToursSection />
      <FeaturesSection />
      <TestimonialsCarousel />
      <GalleryGrid />
      <FAQSection />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
}
