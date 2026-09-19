"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP = "529987777498";

export default function ContactPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === "es";
  const message = isSpanish
    ? "Hola, quiero información para visitar Cenotes Kin-Ha."
    : "Hi, I would like information about visiting Cenotes Kin-Ha.";

  return (
    <section className="min-h-screen bg-[#062c24] px-5 pb-24 pt-32 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#69d8cb]">
            {isSpanish ? "Planea tu visita" : "Plan your visit"}
          </p>
          <h1 className="text-balance text-5xl font-medium leading-[.95] tracking-[-.035em] md:text-7xl">
            {isSpanish ? "Tu aventura empieza aquí." : "Your adventure starts here."}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            {isSpanish
              ? "Dinos dónde te hospedas, cuántas personas viajan y qué fecha prefieres. Te ayudaremos a elegir la experiencia y el punto de recogida correctos."
              : "Tell us where you are staying, your group size and preferred date. We will help you choose the right experience and pickup point."}
          </p>
        </div>

        <div className="border border-white/15 bg-white/[.065] p-7 backdrop-blur-sm sm:p-10">
          <h2 className="mb-8 text-3xl font-medium">
            {isSpanish ? "Habla con Kin-Ha" : "Talk to Kin-Ha"}
          </h2>
          <div className="space-y-4">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 items-center justify-between rounded-full bg-[#69d8cb] px-6 font-bold text-[#062c24] transition hover:bg-white"
            >
              <span>WhatsApp · +52 998 777 7498</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="mailto:reserva@cenotekinha.com"
              className="flex min-h-16 items-center justify-between border-b border-white/15 px-2 text-white/80 transition hover:text-white"
            >
              <span>reserva@cenotekinha.com</span>
              <span aria-hidden="true">↗</span>
            </a>
            <div className="grid gap-5 border-b border-white/15 px-2 py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[#69d8cb]">
                  {isSpanish ? "Horario" : "Hours"}
                </p>
                <p className="mt-2 text-white/75">8:00–17:00 · {isSpanish ? "todos los días" : "daily"}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[#69d8cb]">
                  {isSpanish ? "Ubicación" : "Location"}
                </p>
                <p className="mt-2 text-white/75">Ruta de los Cenotes km 18 · Puerto Morelos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
