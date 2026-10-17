"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import BASE_PATH from "@/lib/basePath";

// Cada slide cuenta su propia historia: cueva, laguna, tirolesa, ATV, grupo.
// Solo fotos reales de Kin-Ha, luminosas y con gente disfrutando la actividad.
const slides = [
  {
    src: `${BASE_PATH}/images/hero-cueva-columpio.webp`,
    alt: {
      es: "Visitante en el columpio sobre el agua azul de la cueva del cenote Kin-Ha",
      en: "Guest on the rope swing over the glowing blue water of the Kin-Ha cave cenote",
    },
    position: "object-[50%_60%]",
    // Escritorio: acerca y corre la foto a la derecha para que la persona no quede detrás del texto.
    desktop: "md:scale-[1.2] md:translate-x-[10%]",
    es: { line1: "Salta a la cueva.", line2: "Vive la aventura." },
    en: { line1: "Dive into the cave.", line2: "Live the adventure." },
  },
  {
    src: `${BASE_PATH}/images/hero-blanca-flor-plataformas.webp`,
    alt: {
      es: "Cenote Blanca Flor abierto al cielo, con plataformas de salto y selva alrededor",
      en: "Open-air Blanca Flor cenote with jumping platforms and jungle all around",
    },
    position: "object-[58%_50%]",
    desktop: "",
    es: { line1: "Agua que brilla.", line2: "Selva que respira." },
    en: { line1: "Water that glows.", line2: "Jungle that breathes." },
  },
  {
    src: `${BASE_PATH}/images/hero-tirolesa-selva.webp`,
    alt: {
      es: "Visitante de cabeza en la tirolesa sobre la selva de Kin-Ha",
      en: "Guest hanging upside down on a zip line above the Kin-Ha jungle",
    },
    position: "object-[55%_35%]",
    desktop: "md:scale-[1.2] md:translate-x-[10%]",
    es: { line1: "Vuela sobre", line2: "la selva." },
    en: { line1: "Fly over", line2: "the jungle." },
  },
  {
    src: `${BASE_PATH}/images/hero-atv-selva.webp`,
    alt: {
      es: "Pareja feliz en cuatrimoto por un camino de la selva",
      en: "Happy couple riding an ATV on a jungle trail",
    },
    position: "object-[62%_50%]",
    desktop: "md:origin-top md:scale-[1.15] md:translate-x-[7.5%]",
    es: { line1: "Acelera en la selva.", line2: "Pura adrenalina." },
    en: { line1: "Ride the jungle.", line2: "Pure adrenaline." },
  },
  {
    src: `${BASE_PATH}/images/hero-grupo.webp`,
    alt: {
      es: "Amigas felices en la plataforma sobre el cenote Blanca Flor",
      en: "Smiling friends on the platform above Blanca Flor cenote",
    },
    position: "object-[55%_40%]",
    desktop: "md:scale-[1.2] md:translate-x-[10%]",
    es: { line1: "El día que", line2: "contarás por años." },
    en: { line1: "The day you'll", line2: "talk about for years." },
  },
];

const copy = {
  es: {
    eyebrow: "Cenotes Kin-Ha · Ruta de los Cenotes, Puerto\u00a0Morelos",
    subtitle:
      "Dos cenotes en un día: la cueva de luz de Kin-Ha y la laguna abierta de Blanca Flor. Tirolesas, saltos, ATV y paseo a caballo, con transporte desde Cancún, Puerto Morelos y Playa del Carmen.",
    subtitleShort:
      "Cenotes, tirolesas, ATV y caballos con transporte desde Cancún, Puerto Morelos y Playa del Carmen.",
    primary: "Reservar mi aventura",
    secondary: "Ver experiencias y precios",
    priceLabel: "Desde",
    pricePer: "por persona",
    social: "Cancelación gratis hasta 24 h antes",
    direct: "Pago seguro en línea",
    highlights: ["2 cenotes", "3 tirolesas", "ATV en la selva", "Comida y tequila"],
  },
  en: {
    eyebrow: "Kin-Ha Cenotes · Ruta de los Cenotes near\u00a0Cancún",
    subtitle:
      "Two cenotes in one day: Kin-Ha's cave of light and Blanca Flor's open-air lagoon. Zip lines, cliff jumps, ATVs and horseback riding, with pickup from Cancún, Puerto Morelos and Playa del Carmen.",
    subtitleShort:
      "Cenotes, zip lines, ATVs and horseback riding with pickup from Cancún, Puerto Morelos and Playa del Carmen.",
    primary: "Book my adventure",
    secondary: "See tours & prices",
    priceLabel: "From",
    pricePer: "per person",
    social: "Free cancellation up to 24h before",
    direct: "Secure online booking",
    highlights: ["2 cenotes", "3 zip lines", "Jungle ATV", "Lunch & tequila"],
  },
};

export default function HeroSlider() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Solo se montan las fotos hasta la siguiente slide: el resto se descarga después.
  const [mountedUpTo, setMountedUpTo] = useState(1);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
      setMountedUpTo((previous) => Math.min(slides.length - 1, previous + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setCurrent(index);
    setMountedUpTo((previous) => Math.max(previous, Math.min(slides.length - 1, index + 1)));
  };

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
          {index <= mountedUpTo && (
            <Image
              src={slide.src}
              alt={slide.alt[locale]}
              fill
              className={`scale-[1.02] object-cover ${slide.position} ${slide.desktop}`}
              priority={index === 0}
              sizes="100vw"
            />
          )}
        </div>
      ))}

      {/* Overlays suaves: la foto se ve luminosa; solo se oscurece donde va el texto.
          Móvil: degradado vertical (el texto ocupa todo el ancho). Escritorio: degradado lateral. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,30,26,.38)_0%,rgba(4,30,26,.32)_40%,rgba(4,30,26,.55)_72%,rgba(4,30,26,.8)_100%)] md:bg-[linear-gradient(90deg,rgba(4,30,26,.7)_0%,rgba(4,30,26,.42)_38%,rgba(4,30,26,.08)_66%,rgba(4,30,26,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#06292a]/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-24 pt-28 text-white sm:px-8 sm:pb-40 lg:px-10">
        <div className="max-w-3xl [text-shadow:0_2px_16px_rgba(0,0,0,.45)]">
          {/* H1 con lo que la gente busca (cenotes, Ruta de los Cenotes, Puerto Morelos);
              la frase de cada foto va debajo, con el mismo estilo de siempre. */}
          <h1
            className="mb-6 flex max-w-xl items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e8b06a] sm:text-sm sm:tracking-[0.26em]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="hidden h-px w-10 shrink-0 bg-[#d99a4e] sm:block" />
            {t.eyebrow}
          </h1>

          <p
            className="text-balance mb-6 font-serif text-[clamp(2.75rem,6.2vw,5.6rem)] font-medium leading-[0.95] tracking-[-0.03em] drop-shadow-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {headline.line1}{" "}
            <span className="italic text-[#e0a85c]">{headline.line2}</span>
          </p>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/90 sm:hidden">
            {t.subtitleShort}
          </p>
          <p className="mb-8 hidden max-w-xl text-lg leading-relaxed text-white/90 sm:block md:text-xl">
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
              href="/#tours"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              {t.secondary}
            </Link>
          </div>

          {/* Precio + prueba social */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="inline-flex items-center gap-2 text-white/90">
              <span className="text-[#5dcaa5]">✓</span>
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
      <div className="absolute bottom-8 left-5 z-20 flex gap-2 sm:bottom-32 sm:left-auto sm:right-8 lg:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current ? "w-10 bg-[#e0a85c]" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`${locale === "es" ? "Mostrar imagen" : "Show image"} ${index + 1}`}
          />
        ))}
      </div>

      {/* Barra de highlights */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/15 bg-[#06292a]/80 backdrop-blur-xl sm:block">
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
