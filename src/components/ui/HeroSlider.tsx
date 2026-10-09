"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import BASE_PATH from "@/lib/basePath";

// Cada slide cuenta su propia historia: cueva, laguna, tirolesa, ATV, grupo.
const slides = [
  {
    src: `${BASE_PATH}/images/hero-cenote-cueva.webp`,
    alt: "Agua azul brillando en la cueva del cenote Kin-Ha",
    position: "object-[center_42%]",
    es: { line1: "Salta a la cueva.", line2: "Vive la aventura." },
    en: { line1: "Dive into the cave.", line2: "Live the adventure." },
  },
  {
    src: `${BASE_PATH}/images/hero-blanca-flor.webp`,
    alt: "Laguna abierta de Blanca Flor rodeada de selva",
    position: "object-center",
    es: { line1: "Agua que brilla.", line2: "Selva que respira." },
    en: { line1: "Water that glows.", line2: "Jungle that breathes." },
  },
  {
    src: `${BASE_PATH}/images/hero-tirolesa.webp`,
    alt: "Visitante en tirolesa sobre el agua del cenote",
    position: "object-[center_40%]",
    es: { line1: "Vuela sobre", line2: "el agua turquesa." },
    en: { line1: "Fly over", line2: "the turquoise water." },
  },
  {
    src: `${BASE_PATH}/images/hero-atv.webp`,
    alt: "Pareja en cuatrimoto salpicando agua en la selva",
    position: "object-[center_45%]",
    es: { line1: "Selva, lodo,", line2: "adrenalina pura." },
    en: { line1: "Jungle, mud,", line2: "pure adrenaline." },
  },
  {
    src: `${BASE_PATH}/images/hero-grupo.webp`,
    alt: "Amigas felices sobre la plataforma del cenote",
    position: "object-[center_35%]",
    es: { line1: "El día que", line2: "contarás por años." },
    en: { line1: "The day you'll", line2: "tell for years." },
  },
];

const copy = {
  es: {
    eyebrow: "Ruta de los Cenotes · Puerto Morelos",
    subtitle:
      "Dos cenotes en un solo día: la cueva de luz de Kin-Ha y la laguna abierta de Blanca Flor. Tirolesas, saltos y ATV, a 30 minutos de Cancún.",
    primary: "Reservar mi aventura",
    secondary: "Ver los cenotes",
    priceLabel: "Desde",
    pricePer: "por persona",
    social: "Historias reales de viajeros",
    direct: "Reserva directa · mejor precio",
    highlights: ["2 cenotes", "3 tirolesas", "ATV en la selva", "Comida yucateca"],
  },
  en: {
    eyebrow: "Cenote Route · Puerto Morelos",
    subtitle:
      "Two cenotes in one day: Kin-Ha's cave of light and Blanca Flor's open lagoon. Zip lines, jumps and ATV, 30 minutes from Cancún.",
    primary: "Book my adventure",
    secondary: "See the cenotes",
    priceLabel: "From",
    pricePer: "per person",
    social: "Real traveler stories",
    direct: "Book direct · best price",
    highlights: ["2 cenotes", "3 zip lines", "Jungle ATV", "Yucatecan lunch"],
  },
};

export default function HeroSlider() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const headline = slides[current][locale];

  return (
    <section
      className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-[#06292a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`scale-[1.02] object-cover ${slide.position}`}
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlays: jade oscuro de un lado, oscurecido abajo para legibilidad */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,25,22,.92)_0%,rgba(6,25,22,.62)_45%,rgba(6,25,22,.15)_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06292a]/92 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-52 pt-28 text-white sm:px-8 sm:pb-40 lg:px-10">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#d99a4e] sm:text-sm">
            <span className="h-px w-10 bg-[#d99a4e]" />
            {t.eyebrow}
          </p>

          <h1 className="text-balance mb-6 font-serif text-[clamp(3rem,7.5vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.03em] drop-shadow-2xl">
            {headline.line1}{" "}
            <span className="italic text-[#e0a85c]">{headline.line2}</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            {t.subtitle}
          </p>

          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/booking"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#c9792e] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_45px_rgba(201,121,46,.3)] transition hover:-translate-y-0.5 hover:bg-[#d99a4e]"
            >
              {t.primary}
              <span aria-hidden="true" className="ml-3">→</span>
            </Link>
            <Link
              href="/#cenotes"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {t.secondary}
            </Link>
          </div>

          {/* Precio + prueba social */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-white/90">
              <span className="tracking-[0.08em] text-[#e0a85c]">★★★★★</span>
              {t.social}
            </span>
            <span className="inline-flex items-center gap-2 text-white/90">
              <span className="text-[#5dcaa5]">✓</span>
              {t.direct}
            </span>
          </div>
        </div>
      </div>

      {/* Puntos de navegación */}
      <div className="absolute bottom-44 right-5 z-20 flex gap-2 sm:bottom-32 sm:right-8 lg:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? "w-10 bg-[#e0a85c]" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`${locale === "es" ? "Mostrar imagen" : "Show image"} ${index + 1}`}
          />
        ))}
      </div>

      {/* Barra de highlights */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/15 bg-[#06292a]/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-8 lg:px-10">
          {t.highlights.map((item, index) => (
            <div key={item} className="flex min-h-20 items-center gap-3 px-3 py-4 sm:min-h-24 sm:px-6">
              <span className="font-serif text-xl text-[#d99a4e]">0{index + 1}</span>
              <span className="text-sm font-semibold text-white/90 sm:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
