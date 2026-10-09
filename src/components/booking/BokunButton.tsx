"use client";

import { useEffect, useState } from "react";
import {
  BOKUN_LOADER_SRC,
  WHATSAPP_FALLBACK,
  getBokunProductId,
  bokunExperienceSrc,
} from "@/lib/bokun";
import { useLanguage } from "@/contexts/LanguageContext";

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

type BokunButtonProps = {
  tourId: string;
  /** Texto del botón (ya traducido por quien llama). */
  label: string;
  /** Mensaje de WhatsApp (ya traducido) para el fallback. */
  whatsappMessage: string;
  className?: string;
  /** Se dispara al hacer click (p. ej. analítica). */
  onInteract?: () => void;
};

export default function BokunButton({
  tourId,
  label,
  whatsappMessage,
  className = "",
  onInteract,
}: BokunButtonProps) {
  const { locale } = useLanguage();
  const productId = getBokunProductId(tourId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId != null) ensureBokunLoader();
  }, [productId]);

  // Sin producto activo en Bokun → enlace directo a WhatsApp.
  if (productId == null) {
    const waUrl = `https://wa.me/${WHATSAPP_FALLBACK}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onInteract}
        className={className}
      >
        {label}
      </a>
    );
  }

  // Producto activo → botón que Bokun convierte en modal de checkout.
  return (
    <button
      type="button"
      className={`bokunButton ${className}`}
      data-src={bokunExperienceSrc(productId, locale)}
      data-testid="widget-book-button"
      onClick={() => {
        onInteract?.();
        setLoading(true);
        window.setTimeout(() => setLoading(false), 8000);
      }}
      aria-busy={loading}
    >
      {loading ? (locale === "en" ? "Loading calendar…" : "Cargando calendario…") : label}
    </button>
  );
}
