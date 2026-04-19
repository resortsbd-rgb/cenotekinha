"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import BASE_PATH from "@/lib/basePath";

const slides = [
  { src: `${BASE_PATH}/images/hero4.png`, alt: "Cenote Kin-Ha agua turquesa" },
  { src: `${BASE_PATH}/images/cenote7.png`, alt: "Cenote Kin-Ha cueva con estalactitas" },
  { src: `${BASE_PATH}/images/hero1.png`, alt: "Cenote Kin-Ha entrada" },
];

export default function HeroSlider() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <div className="mb-5 inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            {t.hero.badge}
          </p>
        </div>

        <h1 className="mb-5 max-w-4xl text-5xl font-bold leading-tight drop-shadow-lg md:text-6xl lg:text-7xl">
          {t.hero.title}
        </h1>
        <p className="mb-10 max-w-xl text-lg text-white/80 md:text-xl leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/experiences"
            className="rounded-full bg-teal-500 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-teal-400 hover:shadow-teal-400/40"
          >
            {t.hero.cta_primary}
          </Link>
          <Link
            href="/booking"
            className="rounded-full border-2 border-white/70 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            {t.hero.cta_secondary}
          </Link>
        </div>
      </div>

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

      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 md:flex">
        <span
          className="text-xs text-white/50 tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
