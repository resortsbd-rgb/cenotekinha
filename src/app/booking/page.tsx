"use client";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TOURS } from "@/lib/stripe";

type TourId = "cenote-dual" | "atv-cenotes" | "ecuestre-cenotes" | "experiencia-completa";

const TOUR_DETAILS: Record<TourId, {
  badge: { es: string; en: string };
  badgeColor: string;
  includes: { es: string[]; en: string[] };
  addons: { es: string[]; en: string[] };
}> = {
  "cenote-dual": {
    badge: { es: "CLÁSICO", en: "CLASSIC" },
    badgeColor: "bg-teal-500",
    includes: {
      es: ["Acceso a 2 cenotes (Kin-Ha + Blanca Flor)", "Equipo de snorkel completo", "Guía certificado bilingüe", "Chaleco salvavidas", "Estacionamiento gratuito"],
      en: ["Access to 2 cenotes (Kin-Ha + Blanca Flor)", "Full snorkel gear", "Bilingual certified guide", "Life jacket", "Free parking"],
    },
    addons: {
      es: ["Fotografía subacuática +$200 MXN", "Casillero +$50 MXN"],
      en: ["Underwater photography +$200 MXN", "Locker +$50 MXN"],
    },
  },
  "atv-cenotes": {
    badge: { es: "MÁS POPULAR", en: "MOST POPULAR" },
    badgeColor: "bg-amber-500",
    includes: {
      es: ["ATV por la selva (30 min)", "Tirolesas sobre el cenote", "Acceso a 2 cenotes", "Equipo de snorkel", "Guía certificado bilingüe", "Chaleco salvavidas"],
      en: ["Jungle ATV (30 min)", "Zip lines over the cenote", "Access to 2 cenotes", "Snorkel gear", "Bilingual certified guide", "Life jacket"],
    },
    addons: {
      es: ["Seguro ATV +$5 USD (~$100 MXN)", "Caballos +$10 USD (~$200 MXN)"],
      en: ["ATV insurance +$5 USD (~$100 MXN)", "Horses +$10 USD (~$200 MXN)"],
    },
  },
  "ecuestre-cenotes": {
    badge: { es: "NATURALEZA", en: "NATURE" },
    badgeColor: "bg-green-600",
    includes: {
      es: ["Paseo a caballo (45 min)", "Acceso a 2 cenotes", "Equipo de snorkel", "Guía certificado bilingüe", "Chaleco salvavidas", "Estacionamiento gratuito"],
      en: ["Horseback ride (45 min)", "Access to 2 cenotes", "Snorkel gear", "Bilingual certified guide", "Life jacket", "Free parking"],
    },
    addons: {
      es: ["Fotografía del paseo +$200 MXN", "Casillero +$50 MXN"],
      en: ["Ride photography +$200 MXN", "Locker +$50 MXN"],
    },
  },
  "experiencia-completa": {
    badge: { es: "MEJOR VALOR", en: "BEST VALUE" },
    badgeColor: "bg-purple-500",
    includes: {
      es: ["Sistema dual de cenotes", "ATV por la selva (30 min)", "Tirolesas", "Paseo a caballo", "Almuerzo yucateco", "Guía certificado bilingüe", "Todo el equipo necesario"],
      en: ["Dual cenote system", "Jungle ATV (30 min)", "Zip lines", "Horseback ride", "Yucatecan lunch", "Bilingual certified guide", "All necessary equipment"],
    },
    addons: {
      es: ["Seguro ATV +$5 USD (~$100 MXN)"],
      en: ["ATV insurance +$5 USD (~$100 MXN)"],
    },
  },
};

const WHATSAPP = "529987777498";

const MONTHS = {
  es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
};

function formatDate(dateStr: string, locale: "es" | "en") {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  const y = parts[0], m = parts[1], d = parts[2];
  const month = MONTHS[locale][m - 1];
  return locale === "es" ? `${d} de ${month} de ${y}` : `${month} ${d}, ${y}`;
}

const WA_ICON = (
  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function BookingPage() {
  const { locale } = useLanguage();
  const [selectedId, setSelectedId] = useState<TourId | null>(null);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);

  const isEs = locale === "es";
  const selectedTour = TOURS.find((t) => t.id === selectedId);
  const selectedDetails = selectedId ? TOUR_DETAILS[selectedId] : null;
  const total = selectedTour ? selectedTour.priceMXN * people : 0;

  const tourName = selectedTour
    ? isEs ? selectedTour.nameEs : selectedTour.nameEn
    : "";

  const dateFormatted = date
    ? formatDate(date, locale)
    : isEs ? "fecha por confirmar" : "date TBD";

  const waMsg = selectedTour
    ? isEs
      ? `Hola, quiero reservar el tour *${tourName}* para *${people} persona${people > 1 ? "s" : ""}* el *${dateFormatted}*. Total estimado: *$${total.toLocaleString()} MXN*. ¿Tienen disponibilidad?`
      : `Hi, I'd like to book the *${tourName}* tour for *${people} person${people > 1 ? "s" : ""}* on *${dateFormatted}*. Estimated total: *$${total.toLocaleString()} MXN*. Do you have availability?`
    : isEs
      ? "Hola, me interesa reservar en Cenotes Kin-Ha. ¿Me pueden dar información sobre los tours disponibles?"
      : "Hi, I'm interested in booking at Cenotes Kin-Ha. Can you tell me about available tours?";

  const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg)}`;
  const today = new Date().toISOString().split("T")[0];

  const TRUST_BADGES = [
    { icon: "⭐", text: isEs ? "4.9 · 200+ reseñas" : "4.9 · 200+ reviews" },
    { icon: "🛡️", text: isEs ? "Guías certificados" : "Certified guides" },
    { icon: "💬", text: isEs ? "Respuesta en < 10 min" : "Response in < 10 min" },
    { icon: "📍", text: "Puerto Morelos, Riviera Maya" },
  ];

  const BRING_ES = ["Traje de baño", "Ropa de cambio", "Toalla", "Bloqueador solar biodegradable", "Agua (también hay tienda en el lugar)", "Zapatos cómodos o acuáticos", "Efectivo para add-ons"];
  const BRING_EN = ["Swimsuit", "Change of clothes", "Towel", "Biodegradable sunscreen", "Water (also available on-site)", "Comfortable or water shoes", "Cash for add-ons"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero ── */}
      <div
        className="relative h-64 md:h-80 flex items-end"
        style={{
          backgroundImage: `url(${TOURS[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-8">
          <p className="text-teal-300 text-xs font-semibold uppercase tracking-widest mb-2">
            Cenotes Kin-Ha · Puerto Morelos
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            {isEs ? "Reserva tu Aventura" : "Book Your Adventure"}
          </h1>
          <div className="flex flex-wrap gap-2">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.text}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
              >
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Step 1: Select Tour ── */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
            {isEs ? "Paso 1" : "Step 1"}
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {isEs ? "Elige tu experiencia" : "Choose your experience"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TOURS.map((tour) => {
              const details = TOUR_DETAILS[tour.id as TourId];
              const isSelected = selectedId === tour.id;
              const name = isEs ? tour.nameEs : tour.nameEn;
              const desc = isEs ? tour.descEs : tour.descEn;
              const badge = details.badge[locale];

              return (
                <button
                  key={tour.id}
                  onClick={() => setSelectedId(isSelected ? null : (tour.id as TourId))}
                  className={`text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-xl focus:outline-none w-full ${
                    isSelected
                      ? "border-teal-500 shadow-teal-100"
                      : "border-transparent bg-white hover:border-teal-200"
                  }`}
                >
                  {/* Card image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <span
                      className={`absolute top-3 left-3 ${details.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}
                    >
                      {badge}
                    </span>
                    {isSelected && (
                      <span className="absolute top-3 right-3 bg-teal-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
                        ✓
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow">
                        {name}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="bg-white p-4">
                    <p className="text-slate-500 text-sm mb-3 leading-relaxed">{desc}</p>

                    <div className="flex items-end justify-between">
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {tour.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {isEs ? `Máx. ${tour.maxPeople}` : `Max. ${tour.maxPeople}`}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">{isEs ? "Desde" : "From"}</span>
                        <span className="text-teal-700 font-bold text-xl leading-none">
                          ${tour.priceMXN.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">MXN/pax</span>
                      </div>
                    </div>

                    {/* Expanded: includes + add-ons */}
                    {isSelected && details && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                            {isEs ? "✅ Incluye" : "✅ Includes"}
                          </p>
                          <ul className="space-y-1.5">
                            {details.includes[locale].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {details.addons[locale].length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                              {isEs ? "➕ Add-ons disponibles" : "➕ Available add-ons"}
                            </p>
                            <ul className="space-y-1.5">
                              {details.addons[locale].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Step 2: Date & People ── */}
        <div className={`mb-10 transition-opacity duration-300 ${selectedId ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-1">
            {isEs ? "Paso 2" : "Step 2"}
          </p>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {isEs ? "Fecha y personas" : "Date & people"}
          </h2>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date picker */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {isEs ? "📅 Fecha preferida" : "📅 Preferred date"}
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {isEs ? "Abierto todos los días 8am–5pm" : "Open every day 8am–5pm"}
                </p>
              </div>

              {/* People counter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {isEs ? "👥 Número de personas" : "👥 Number of people"}
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}
                    className="px-5 py-3 text-xl font-bold text-slate-600 hover:bg-slate-50 transition active:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-xl font-bold text-slate-800 py-3">
                    {people}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPeople((p) => Math.min(selectedTour?.maxPeople ?? 20, p + 1))}
                    className="px-5 py-3 text-xl font-bold text-slate-600 hover:bg-slate-50 transition active:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                {selectedTour && (
                  <p className="text-xs text-slate-400 mt-1">
                    {isEs ? `Máximo ${selectedTour.maxPeople} personas por grupo` : `Maximum ${selectedTour.maxPeople} people per group`}
                  </p>
                )}
              </div>
            </div>

            {/* Total estimado */}
            {selectedTour && (
              <div className="mt-6 p-4 bg-teal-50 border border-teal-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {isEs ? "Total estimado" : "Estimated total"}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    ${selectedTour.priceMXN.toLocaleString()} MXN × {people} {isEs ? `persona${people > 1 ? "s" : ""}` : `person${people > 1 ? "s" : ""}`}
                  </p>
                  <p className="text-xs text-slate-400">{isEs ? "Antes de add-ons opcionales" : "Before optional add-ons"}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-bold text-teal-700">
                    ${total.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500">MXN</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── WhatsApp CTA ── */}
        <div className="mb-12">
          <a
            href={selectedId ? waUrl : undefined}
            target={selectedId ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-white text-lg font-bold shadow-lg transition-all duration-300 ${
              selectedId
                ? "bg-green-500 hover:bg-green-400 hover:shadow-green-300/60 hover:scale-[1.015] active:scale-[0.99] cursor-pointer"
                : "bg-slate-300 cursor-not-allowed"
            }`}
            aria-disabled={!selectedId}
          >
            {WA_ICON}
            <span>
              {selectedId
                ? isEs ? "Reservar por WhatsApp" : "Book via WhatsApp"
                : isEs ? "Selecciona un tour para continuar" : "Select a tour to continue"}
            </span>
          </a>
          {selectedId && (
            <p className="text-center text-sm text-slate-500 mt-3">
              {isEs
                ? "💬 Te respondemos en menos de 10 minutos para confirmar tu reserva"
                : "💬 We reply in under 10 minutes to confirm your booking"}
            </p>
          )}
        </div>

        {/* ── What to bring + How to get there ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Qué traer */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {isEs ? "🎒 ¿Qué traer?" : "🎒 What to bring?"}
            </h3>
            <ul className="space-y-2">
              {(isEs ? BRING_ES : BRING_EN).map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs flex-shrink-0 font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cómo llegar */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {isEs ? "📍 ¿Cómo llegar?" : "📍 How to get there?"}
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: "🚗",
                  title: isEs ? "Desde Cancún" : "From Cancún",
                  desc: isEs ? "~30 min por la Ruta de los Cenotes (Carr. 307)" : "~30 min on the Cenote Route (Hwy 307)",
                },
                {
                  icon: "🛫",
                  title: isEs ? "Desde el Aeropuerto CUN" : "From CUN Airport",
                  desc: isEs ? "~25 min, Uber disponible" : "~25 min, Uber available",
                },
                {
                  icon: "🏖️",
                  title: isEs ? "Desde Playa del Carmen" : "From Playa del Carmen",
                  desc: isEs ? "~20 min por la carretera 307" : "~20 min on highway 307",
                },
              ].map((row) => (
                <div key={row.title} className="flex gap-3">
                  <span className="text-2xl leading-none mt-0.5">{row.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{row.title}</p>
                    <p className="text-sm text-slate-500">{row.desc}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 bg-slate-50 rounded-xl mt-2">
                <p className="text-xs text-slate-500 flex items-start gap-2">
                  <span className="flex-shrink-0">📌</span>
                  <span>
                    {isEs
                      ? "Al confirmar tu reserva por WhatsApp te enviamos el pin exacto en Google Maps."
                      : "When you confirm your booking via WhatsApp we'll send you the exact Google Maps pin."}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
