"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === "es";

  return (
    <div className="bg-[#f6f1e7] pb-24 pt-28 text-[#10231e]">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[520px] overflow-hidden">
          <Image
            src="/images/cta-blanca-flor.webp"
            alt={isSpanish ? "Visitantes nadando en el cenote Blanca Flor, rodeado por la selva" : "Guests swimming in Blanca Flor cenote, surrounded by jungle"}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="lg:px-8">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.28em] text-[#0b7760]">
            {isSpanish ? "Nuestra esencia" : "Our essence"}
          </p>
          <h1 className="text-balance text-5xl font-medium leading-[.95] tracking-[-.035em] md:text-7xl">
            {isSpanish ? (
              <><span className="whitespace-nowrap">Cenotes Kin-Ha:</span> dos cenotes y una selva viva.</>
            ) : (
              <><span className="whitespace-nowrap">Kin-Ha Cenotes:</span> two cenotes, one living jungle.</>
            )}
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-[#10231e]/70">
            {isSpanish
              ? "Kin-Ha nace en la Ruta de los Cenotes de Puerto Morelos: un paisaje de piedra caliza, agua cristalina y selva maya. Blanca Flor se abre al cielo; Kin-Ha revela el mundo subterráneo de estalactitas y agua azul profunda."
              : "Kin-Ha lives on Puerto Morelos’ Cenote Route: a landscape of limestone, crystal-clear water and Maya jungle. Blanca Flor opens to the sky; Kin-Ha reveals an underground world of stalactites and deep blue water."}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-[#10231e]/70">
            {isSpanish
              ? "Aquí la aventura no reemplaza a la naturaleza: te acerca a ella. Por eso cuidamos el agua, mantenemos grupos manejables y explicamos cómo disfrutar los cenotes con respeto."
              : "Here, adventure does not replace nature—it brings you closer to it. That is why we protect the water, keep groups manageable and show guests how to enjoy the cenotes responsibly."}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-[#10231e]/70">
            {isSpanish
              ? "Además de nadar en los dos cenotes, puedes cruzar la selva en tres tirolesas, manejar un ATV o recorrerla en un paseo a caballo, con transporte desde Cancún, Puerto Morelos y Playa del Carmen."
              : "Besides swimming in both cenotes, you can fly over the jungle on three zip lines, ride an ATV or explore it on a horseback riding tour, with pickup from Cancún, Puerto Morelos and Playa del Carmen."}
          </p>
          <Link
            href="/booking"
            className="mt-9 inline-flex min-h-14 items-center rounded-full bg-[#0b4638] px-8 py-4 font-bold text-white transition hover:bg-[#19b77a] hover:text-[#062c24]"
          >
            {isSpanish ? "Conocer las experiencias" : "Explore the experiences"}
            <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
