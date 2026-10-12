"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TOURS } from "@/lib/stripe";
import BokunButton from "@/components/booking/BokunButton";
import PromoLine from "@/components/ui/PromoLine";
import { getBokunProductId } from "@/lib/bokun";
import { trackWhatsAppClick } from "@/lib/analytics";

const TRANSPORT_SHORT = {
  pickup: { es: "Recogida incluida", en: "Pickup included" },
  own: { es: "Llegas en tu auto", en: "Drive in" },
  "on-request": { es: "Transporte disponible", en: "Pickup available" },
} as const;

// Punto exacto de Cenotes Kin-Ha en Google Maps (la ficha no indica kilómetro).
const MAPS_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=20.851221,-87.1276722";

type TourId = "cenote-dual" | "atv-cenotes" | "ecuestre-cenotes" | "experiencia-completa" | "tour-ecologico";

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
      es: ["Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Chaleco salvavidas", "Degustación de tequila", "Guía bilingüe", "Lockers, baños y regaderas", "Estacionamiento gratuito"],
      en: ["Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Life jacket", "Tequila tasting", "Bilingual guide", "Lockers, restrooms and showers", "Free parking"],
    },
    addons: {
      es: ["Paquete de fotos (opcional)"],
      en: ["Photo package (optional)"],
    },
  },
  "tour-ecologico": {
    badge: { es: "ECOLÓGICO", en: "ECO TOUR" },
    badgeColor: "bg-emerald-600",
    includes: {
      es: ["Transporte desde tu hotel (Cancún, Puerto Morelos, Playa del Carmen)", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana", "Degustación de tequila", "Chaleco salvavidas", "Lockers, baños y regaderas"],
      en: ["Hotel pickup (Cancún, Puerto Morelos, Playa del Carmen)", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Mexican lunch", "Tequila tasting", "Life jacket", "Lockers, restrooms and showers"],
    },
    addons: {
      es: ["Paquete de fotos (opcional)"],
      en: ["Photo package (optional)"],
    },
  },
  "atv-cenotes": {
    badge: { es: "MÁS POPULAR", en: "MOST POPULAR" },
    badgeColor: "bg-amber-500",
    includes: {
      es: ["Transporte desde tu hotel (Cancún, Puerto Morelos, Playa del Carmen)", "ATV por la selva", "3 tirolesas", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana", "Degustación de tequila", "Chaleco salvavidas", "Guía bilingüe", "Lockers, baños y regaderas"],
      en: ["Hotel pickup (Cancún, Puerto Morelos, Playa del Carmen)", "Jungle ATV", "3 zip lines", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Mexican lunch", "Tequila tasting", "Life jacket", "Bilingual guide", "Lockers, restrooms and showers"],
    },
    addons: {
      es: ["ATV individual (opcional)"],
      en: ["Individual ATV (optional)"],
    },
  },
  "ecuestre-cenotes": {
    badge: { es: "NATURALEZA", en: "NATURE" },
    badgeColor: "bg-green-600",
    includes: {
      es: ["Paseo a caballo (45 min)", "Cenote Kin-Ha y Cenote Blanca Flor", "Traslado de un cenote a otro", "Degustación de tequila", "Guía certificado bilingüe", "Chaleco salvavidas", "Lockers, baños y regaderas", "Estacionamiento gratuito"],
      en: ["Horseback ride (45 min)", "Kin-Ha and Blanca Flor cenotes", "Ride between the two cenotes", "Tequila tasting", "Bilingual certified guide", "Life jacket", "Lockers, restrooms and showers", "Free parking"],
    },
    addons: {
      es: ["Transporte desde tu hotel (te lo cotizamos por WhatsApp)", "Fotografía del paseo (opcional)"],
      en: ["Hotel pickup (quoted on WhatsApp)", "Ride photography (optional)"],
    },
  },
  "experiencia-completa": {
    badge: { es: "MEJOR VALOR", en: "BEST VALUE" },
    badgeColor: "bg-purple-500",
    includes: {
      es: ["Transporte de ida y vuelta a tu hotel", "ATV por la selva (40 min)", "Paseo a caballo (40 min)", "Tirolesas", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana tradicional y agua", "Degustación de tequila", "Chaleco salvavidas y equipo de seguridad", "Guía bilingüe", "Lockers, baños y regaderas"],
      en: ["Round-trip hotel pickup", "Jungle ATV (40 min)", "Horseback ride (40 min)", "Zip lines", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Traditional Mexican lunch and water", "Tequila tasting", "Life jacket and safety gear", "Bilingual guide", "Lockers, restrooms and showers"],
    },
    addons: {
      es: [],
      en: [],
    },
  },
};

const WHATSAPP = "529982053527";

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

  // Preselección desde los botones del sitio: /booking?tour=<id>
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tour");
    // La URL solo existe en el navegador; se lee una vez tras hidratar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl && fromUrl in TOUR_DETAILS) setSelectedId(fromUrl as TourId);
  }, []);

  const isEs = locale === "es";
  const selectedTour = TOURS.find((t) => t.id === selectedId);

  const tourName = selectedTour
    ? isEs ? selectedTour.nameEs : selectedTour.nameEn
    : "";

  const dateFormatted = date
    ? formatDate(date, locale)
    : isEs ? "fecha por confirmar" : "date TBD";

  const waMsg = selectedTour
    ? isEs
      ? `Hola, quiero reservar el tour *${tourName}* para *${people} persona${people > 1 ? "s" : ""}* el *${dateFormatted}*. ¿Tienen disponibilidad?`
      : `Hi, I'd like to book the *${tourName}* tour for *${people} person${people > 1 ? "s" : ""}* on *${dateFormatted}*. Do you have availability?`
    : isEs
      ? "Hola, me interesa reservar en Cenotes Kin-Ha. ¿Me pueden dar información sobre los tours disponibles?"
      : "Hi, I'm interested in booking at Cenotes Kin-Ha. Can you tell me about available tours?";

  const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg)}`;
  const bokunProductId = selectedId ? getBokunProductId(selectedId) : null;
  const today = new Date().toISOString().split("T")[0];

  const TRUST_BADGES = [
    { icon: "💧", text: isEs ? "2 cenotes naturales" : "2 natural cenotes" },
    { icon: "⚡", text: isEs ? "3 tirolesas" : "3 zip lines" },
    { icon: "✅", text: isEs ? "Cancelación gratis 24 h" : "Free cancellation 24h" },
    { icon: "📍", text: "Puerto Morelos, Riviera Maya" },
  ];

  const BRING_ES = ["Traje de baño", "Ropa de cambio", "Toalla", "Zapatos cómodos o acuáticos", "Agua", "Efectivo para extras", "Importante: no usar bloqueador solar"];
  const BRING_EN = ["Swimsuit", "Change of clothes", "Towel", "Comfortable or water shoes", "Water", "Cash for extras", "Important: do not use sunscreen"];

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
              const online = getBokunProductId(tour.id) != null;

              return (
                <button
                  key={tour.id}
                  onClick={() => setSelectedId(isSelected ? null : (tour.id as TourId))}
                  className={`self-start text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm hover:shadow-xl focus:outline-none w-full ${
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
                      className={`w-full h-full object-cover ${tour.imagePosition ?? "object-center"} transition-transform duration-500 group-hover:scale-105`}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          {TRANSPORT_SHORT[tour.transport][locale]}
                        </span>
                      </div>
                      <span className="text-right">
                      {tour.fromMXN != null && (
                        <span className="block text-lg font-extrabold text-teal-700">
                          {isEs ? `Desde $${tour.fromMXN.toLocaleString("es-MX")} MXN` : `From $${tour.fromUSD} USD`}
                        </span>
                      )}
                      <PromoLine promo={tour.promo} className="max-w-[14rem] text-[11px] font-semibold text-amber-600" />
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${online ? "text-teal-700" : "text-green-700"}`}>
                        {online
                          ? isEs ? "Reserva en línea" : "Book online"
                          : isEs ? "Reserva por WhatsApp" : "Book via WhatsApp"}
                      </span>
                      </span>
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
        <div className={`mb-10 transition-opacity duration-300 ${selectedId ? "opacity-100" : "opacity-40 pointer-events-none"} ${bokunProductId != null ? "hidden" : ""}`}>
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
                  {isEs ? "Abierto todos los días 9am–5pm" : "Open every day 9am–5pm"}
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
                    onClick={() => setPeople((p) => p + 1)}
                    className="px-5 py-3 text-xl font-bold text-slate-600 hover:bg-slate-50 transition active:bg-slate-100"
                  >
                    +
                  </button>
                </div>
                {selectedTour && (
                  <p className="text-xs text-slate-400 mt-1">
                    {isEs ? "¿Grupo grande? Escríbenos por WhatsApp y te cotizamos." : "Large group? Message us on WhatsApp for a group quote."}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── CTA de reserva ── */}
        <div className="mb-12">
          {!selectedId && (
            <div className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-slate-300 text-white text-lg font-bold shadow-lg cursor-not-allowed">
              <span>{isEs ? "Selecciona un tour para continuar" : "Select a tour to continue"}</span>
            </div>
          )}

          {selectedId && bokunProductId != null && (
            <>
              <BokunButton
                tourId={selectedId}
                label={isEs ? "Ver fechas y reservar" : "See dates & book"}
                whatsappMessage={waMsg}
                tourName={tourName}
                source="booking_page"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#c9792e] text-white text-lg font-bold shadow-lg transition-all duration-300 hover:bg-[#d99a4e] hover:shadow-[0_14px_45px_rgba(201,121,46,.35)] hover:scale-[1.015] active:scale-[0.99] cursor-pointer"
              />
              <p className="text-center text-sm text-slate-500 mt-3">
                {isEs
                  ? "🔒 Elige fecha y personas en el calendario · pago seguro · confirmación inmediata"
                  : "🔒 Pick your date and group size in the calendar · secure payment · instant confirmation"}
              </p>
            </>
          )}

          {selectedId && bokunProductId == null && (
            <>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("booking_page", tourName)}
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-green-500 text-white text-lg font-bold shadow-lg transition-all duration-300 hover:bg-green-400 hover:shadow-green-300/60 hover:scale-[1.015] active:scale-[0.99] cursor-pointer"
              >
                {WA_ICON}
                <span>{isEs ? "Reservar por WhatsApp" : "Book via WhatsApp"}</span>
              </a>
              <p className="text-center text-sm text-slate-500 mt-3">
                {isEs
                  ? "💬 Te confirmamos disponibilidad, precio y transportación por WhatsApp"
                  : "💬 We confirm availability, price and transportation on WhatsApp"}
              </p>
            </>
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
                  title: isEs ? "Recogida en Cancún" : "Cancún pickup",
                  desc: isEs ? "Hotel, Airbnb o punto de encuentro confirmado al reservar" : "Hotel, Airbnb or meeting point confirmed at booking",
                },
                {
                  icon: "🛫",
                  title: isEs ? "Recogida en Puerto Morelos" : "Puerto Morelos pickup",
                  desc: isEs ? "Horario y ubicación exacta según tu hospedaje" : "Exact time and location based on your accommodation",
                },
                {
                  icon: "🏖️",
                  title: isEs ? "Recogida en Playa del Carmen" : "Playa del Carmen pickup",
                  desc: isEs ? "Hotel, Airbnb o punto de encuentro confirmado al reservar" : "Hotel, Airbnb or meeting point confirmed at booking",
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
                      ? "El Tour ecológico, el tour de ATV y la Aventura completa incluyen transporte desde tu hotel. Si vienes en tu auto, hay estacionamiento gratis. "
                      : "The Eco Tour, the ATV tour and the Full Adventure include hotel pickup. If you drive, parking is free. "}
                    <a
                      href={MAPS_DIRECTIONS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-teal-700 underline underline-offset-2"
                    >
                      {isEs ? "Cómo llegar (Google Maps)" : "Get directions (Google Maps)"}
                    </a>
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
