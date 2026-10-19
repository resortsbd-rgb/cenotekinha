"use client";

import { useEffect, useRef, useState } from "react";
import {
  BOKUN_LOADER_SRC,
  WHATSAPP_FALLBACK,
  getBokunProductId,
  bokunExperienceSrc,
} from "@/lib/bokun";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  trackBookingClick,
  trackCalendarError,
  trackCalendarOpen,
  trackWhatsAppClick,
} from "@/lib/analytics";

// El loader de Bokun se inyecta una sola vez por página.
// Una vez cargado, Bokun observa el DOM y engancha cualquier
// elemento con class "bokunButton" para abrir su modal de
// calendario + pago (Stripe / PayPal) sobre el sitio.
let loaderInjected = false;

function ensureBokunLoader() {
  if (typeof document === "undefined") return;
  if (loaderInjected || document.querySelector('script[data-bokun-loader="1"]')) {
    loaderInjected = true;
    return;
  }
  const script = document.createElement("script");
  script.src = BOKUN_LOADER_SRC;
  script.async = true;
  script.type = "text/javascript";
  script.setAttribute("data-bokun-loader", "1");
  document.body.appendChild(script);
  loaderInjected = true;
}

// El contenedor del modal existe (vacío, 0 px de alto) desde que carga el loader.
// Cuando el calendario se muestra, el contenedor toma el alto de la ventana.
function bokunModalIsOpen() {
  const modal = document.getElementById("bokun-modal-container");
  return !!modal && modal.getBoundingClientRect().height > 80;
}

// Si en este tiempo no se ve el calendario, se ofrece WhatsApp como respaldo.
const CALENDAR_TIMEOUT_MS = 15000;

type BokunButtonProps = {
  tourId: string;
  /** Texto del botón (ya traducido por quien llama). */
  label: string;
  /** Mensaje de WhatsApp (ya traducido) para el fallback. */
  whatsappMessage: string;
  /** Nombre del tour para analítica (ya traducido). */
  tourName?: string;
  /** Dónde está el botón, para analítica: "tour_card", "booking_page"… */
  source?: string;
  className?: string;
  /** Se dispara al hacer click, además de la analítica. */
  onInteract?: () => void;
};

export default function BokunButton({
  tourId,
  label,
  whatsappMessage,
  tourName,
  source = "unknown",
  className = "",
  onInteract,
}: BokunButtonProps) {
  const { locale } = useLanguage();
  const productId = getBokunProductId(tourId);
  const [status, setStatus] = useState<"idle" | "loading" | "failed">("idle");
  const watcher = useRef<number | null>(null);
  const name = tourName ?? tourId;

  useEffect(() => {
    if (productId != null) ensureBokunLoader();
  }, [productId]);

  // Detiene el vigilante del modal si el botón se desmonta.
  useEffect(
    () => () => {
      if (watcher.current != null) window.clearInterval(watcher.current);
    },
    [],
  );

  const waUrl = `https://wa.me/${WHATSAPP_FALLBACK}?text=${encodeURIComponent(whatsappMessage)}`;

  // Sin producto activo en Bokun → enlace directo a WhatsApp.
  if (productId == null) {
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWhatsAppClick(source, name);
          onInteract?.();
        }}
        className={className}
      >
        {label}
      </a>
    );
  }

  const stopWatching = () => {
    if (watcher.current != null) window.clearInterval(watcher.current);
    watcher.current = null;
  };

  const handleClick = () => {
    trackBookingClick(tourId, name, source);
    onInteract?.();
    setStatus("loading");
    stopWatching();
    const started = Date.now();
    watcher.current = window.setInterval(() => {
      if (bokunModalIsOpen()) {
        stopWatching();
        setStatus("idle");
        trackCalendarOpen(tourId, name, Date.now() - started);
      } else if (Date.now() - started > CALENDAR_TIMEOUT_MS) {
        stopWatching();
        setStatus("failed");
        trackCalendarError(tourId, name);
      }
    }, 250);
  };

  // Producto activo → botón que Bokun convierte en modal de calendario + pago.
  return (
    <>
      {/* key: al cambiar de idioma React crea un botón NUEVO. Bókun deja de abrir el
          calendario si se le cambia el data-src a un botón que ya enganchó. */}
      <button
        key={`${productId}-${locale}`}
        type="button"
        className={`bokunButton ${className}`}
        data-src={bokunExperienceSrc(productId, locale)}
        data-testid="widget-book-button"
        onClick={handleClick}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (locale === "en" ? "Loading calendar…" : "Cargando calendario…") : label}
      </button>
      {status === "failed" && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`${source}_fallback`, name)}
          className="order-last mt-1 block basis-full text-sm font-semibold text-[#c9792e] underline underline-offset-4"
        >
          {locale === "en" ? "Calendar didn’t open? Book on WhatsApp" : "¿No abrió el calendario? Reserva por WhatsApp"}
        </a>
      )}
    </>
  );
}
