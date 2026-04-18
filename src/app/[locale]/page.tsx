"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/ui/HeroSlider";
import StatsSection from "@/components/ui/StatsSection";
import ToursSection from "@/components/ui/ToursSection";
import FeaturesSection from "@/components/ui/FeaturesSection";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import GalleryGrid from "@/components/ui/GalleryGrid";
import FAQSection from "@/components/ui/FAQSection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { translations } from "@/lib/translations";
import type { Locale } from "@/lib/translations";

export default function HomePage() {
  const { locale } = useParams<{ locale: string }>();
  const t = translations[(locale as Locale) ?? "es"];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Stats */}
      <StatsSection />

      {/* 3. Tours */}
      <ToursSection />

      {/* 4. Features */}
      <FeaturesSection />

      {/* 5. Testimonials */}
      <TestimonialsCarousel />

      {/* 6. Gallery */}
      <GalleryGrid />

      {/* 7. FAQ */}
      <FAQSection />

      {/* 8. Final CTA */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero4.png"
            alt="Cenote Kin-Ha"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-teal-900/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Puerto Morelos, Riviera Maya
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.cta_final.title}
          </h2>
          <p className="text-teal-200 mb-8 text-lg">{t.cta_final.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="inline-block bg-teal-400 text-teal-900 font-bold px-10 py-4 rounded-full hover:bg-teal-300 transition text-lg shadow-lg"
            >
              {t.cta_final.btn}
            </Link>
            <a
              href={`https://wa.me/529982753162?text=${encodeURIComponent(t.whatsapp_msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full transition text-lg shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </div>
  );
}
