"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const slides = [
  { src: "/images/hero4.png", alt: "Cenote Kin-Ha agua turquesa" },
  { src: "/images/cenote7.png", alt: "Cenote Kin-Ha cueva con estalactitas" },
  { src: "/images/hero1.png", alt: "Cenote Kin-Ha letrero entrada" },
];

export default function HeroSlider() {
  const t = useTranslations("home");
  const { locale } = useParams<{ locale: string }>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">
          Riviera Maya, México
        </p>
        <h1 className="mb-4 max-w-4xl text-5xl font-bold leading-tight drop-shadow-lg md:text-6xl lg:text-7xl">
          {t("hero_title")}
        </h1>
        <p className="mb-10 max-w-xl text-lg text-white/80 md:text-xl">
          {t("hero_subtitle")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/booking`}
            className="rounded-full bg-teal-400 px-8 py-3 font-semibold text-teal-900 shadow-lg transition hover:bg-teal-300 hover:shadow-teal-400/40"
          >
            {t("cta_book")}
          </Link>
          <Link
            href={`/${locale}/experiences`}
            className="rounded-full border-2 border-white/70 px-8 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            {t("cta_explore")}
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-teal-400" : "w-2 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 md:flex">
        <span className="text-xs text-white/50 tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
