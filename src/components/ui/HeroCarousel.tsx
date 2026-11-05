"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroSlide } from "@/lib/heroSlides";

const INTERVAL_MS = 5500;

// Encabezado inmersivo: fotos a pantalla completa con cambio suave.
// La primera foto viene en el HTML; las demás se cargan cuando van a mostrarse.
export default function HeroCarousel({
  slides,
  title,
  actions,
}: {
  slides: HeroSlide[];
  title: string;
  actions?: React.ReactNode;
}) {
  const { locale } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [mountedUpTo, setMountedUpTo] = useState(1);
  const [playing, setPlaying] = useState(true);

  // Quien pide menos movimiento en su dispositivo ve la primera foto fija.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // La preferencia solo existe en el navegador; se lee una vez tras hidratar.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setCurrent((previous) => (previous + 1) % slides.length);
      setMountedUpTo((previous) => Math.min(slides.length - 1, previous + 1));
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, slides.length]);

  function goTo(index: number) {
    setCurrent(index);
    setMountedUpTo((previous) => Math.max(previous, Math.min(slides.length - 1, index + 1)));
  }

  const isEs = locale === "es";
  const headline = slides[current].headline[locale];

  return (
    <section
      aria-roledescription={isEs ? "carrusel" : "carousel"}
      aria-label={isEs ? "Fotos de Cenotes Kin-Ha" : "Photos of Kin-Ha Cenotes"}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#06292a]"
    >
      {slides.map((slide, index) => {
        const active = index === current;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${active ? "opacity-100" : "opacity-0"}`}
          >
            {index <= mountedUpTo && (
              // Se usa <img> para servir 828 px en celular y 1600 px en computadora.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/images/hero/${slide.id}-1600.webp`}
                srcSet={`/images/hero/${slide.id}-828.webp 828w, /images/hero/${slide.id}-1600.webp 1600w`}
                sizes="100vw"
                alt={slide.alt[locale]}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`hero-kenburns h-full w-full object-cover ${slide.position}`}
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#031a15]/95 via-[#031a15]/55 to-transparent" />

      <div className="absolute inset-x-0 bottom-0">
        <div className={`mx-auto max-w-6xl px-5 text-white sm:px-8 ${actions ? "pb-24" : "pb-8 sm:pb-10"}`}>
          <h1 className="mb-4 max-w-3xl text-xs font-semibold uppercase tracking-[0.16em] text-[#e8b06a] [text-shadow:0_2px_12px_rgba(0,0,0,.5)] sm:text-sm">
            {title}
          </h1>
          <p className="max-w-4xl text-balance font-serif text-[clamp(2.75rem,6.4vw,5.8rem)] font-medium leading-[0.95] tracking-[-0.03em] [text-shadow:0_4px_24px_rgba(0,0,0,.45)]">
            {headline.line1} <span className="italic text-[#e0a85c]">{headline.line2}</span>
          </p>
          {actions && <div className="mt-7">{actions}</div>}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <p className="w-full text-sm text-white/85 sm:w-auto" aria-live="off">{slides[current].caption[locale]}</p>
            <div className="flex shrink-0 items-center gap-1">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${isEs ? "Ver foto" : "Show photo"} ${index + 1}`}
                  aria-current={index === current}
                  className="grid h-8 w-8 place-items-center"
                >
                  <span className={`block h-2 rounded-full transition-all ${index === current ? "w-6 bg-white" : "w-2 bg-white/50"}`} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? (isEs ? "Pausar fotos" : "Pause photos") : (isEs ? "Reanudar fotos" : "Play photos")}
                className="ml-1 grid h-8 w-8 place-items-center rounded-full border border-white/40 text-xs text-white"
              >
                <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
