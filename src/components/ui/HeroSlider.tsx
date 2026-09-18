"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import BASE_PATH from "@/lib/basePath";

const slides = [
  { src: `${BASE_PATH}/images/hero4.png`, alt: "Cenote abierto Blanca Flor en la selva maya" },
  { src: `${BASE_PATH}/images/cenote5.png`, alt: "Aventura en cuatrimoto por la Ruta de los Cenotes" },
  { src: `${BASE_PATH}/images/cenote6.png`, alt: "Visitantes preparados para las tirolesas de Kin-Ha" },
];

const copy = {
  es: {
    eyebrow: "Ruta de los Cenotes · Puerto Morelos",
    title: "Selva adentro, el mundo cambia.",
    subtitle:
      "Atraviesa la selva en ATV, vuela en 3 tirolesas y sumérgete en dos cenotes extraordinarios —uno abierto al cielo y otro bajo la tierra.",
    primary: "Elegir mi aventura",
    secondary: "Hablar con un asesor",
    note: "Salidas 08:30 y 12:30 · Transportación disponible",
    highlights: ["2 cenotes", "3 tirolesas", "ATV en la selva", "Comida mexicana"],
  },
  en: {
    eyebrow: "Cenote Route · Puerto Morelos",
    title: "Step into the jungle. Leave the ordinary behind.",
    subtitle:
      "Ride an ATV through the jungle, fly across 3 zip lines and swim in two extraordinary cenotes —one open to the sky, one hidden underground.",
    primary: "Choose my adventure",
    secondary: "Chat with an advisor",
    note: "Departures at 8:30 AM & 12:30 PM · Transportation available",
    highlights: ["2 cenotes", "3 zip lines", "Jungle ATV", "Mexican lunch"],
  },
};

export default function HeroSlider() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const whatsappMessage =
    locale === "es"
      ? "Hola, quiero conocer disponibilidad y precio para la aventura de ATV, 3 tirolesas y 2 cenotes."
      : "Hi, I would like to check availability and pricing for the ATV, 3 zip lines and 2 cenotes adventure.";

  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-[#062c24]">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="scale-[1.02] object-cover object-center"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,24,19,.94)_0%,rgba(3,24,19,.7)_42%,rgba(3,24,19,.12)_78%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031a15]/90 via-transparent to-black/30" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-52 pt-28 text-white sm:px-8 sm:pb-36 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#69d8cb] sm:text-sm">
            <span className="h-px w-10 bg-[#69d8cb]" />
            {t.eyebrow}
          </p>

          <h1 className="text-balance mb-6 text-[clamp(3.3rem,8vw,7.6rem)] font-medium leading-[0.88] tracking-[-0.045em] drop-shadow-2xl">
            {t.title}
          </h1>
          <p className="mb-9 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            {t.subtitle}
          </p>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/booking"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#69d8cb] px-8 py-4 text-base font-bold text-[#062c24] shadow-[0_14px_45px_rgba(42,201,174,.25)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              {t.primary}
              <span aria-hidden="true" className="ml-3">↗</span>
            </Link>
            <a
              href={`https://wa.me/529987777498?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-[#062c24]"
            >
              {t.secondary}
            </a>
          </div>
          <p className="mt-5 text-sm text-white/65">{t.note}</p>
        </div>
      </div>

      <div className="absolute bottom-44 right-5 z-20 flex gap-2 sm:bottom-28 sm:right-8 lg:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-8 bg-[#69d8cb]" : "w-2 bg-white/50"
            }`}
            aria-label={`${locale === "es" ? "Mostrar imagen" : "Show image"} ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-[#031a15]/78 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-8 lg:px-10">
          {t.highlights.map((item, index) => (
            <div key={item} className="flex min-h-20 items-center gap-3 px-3 py-4 sm:min-h-24 sm:px-6">
              <span className="font-serif text-xl text-[#d9ad62]">0{index + 1}</span>
              <span className="text-sm font-semibold text-white/90 sm:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
