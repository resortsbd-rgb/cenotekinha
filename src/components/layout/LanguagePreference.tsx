"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage, rememberLocale, storedLocale } from "@/contexts/LanguageContext";
import { alternatePath } from "@/lib/routes";
import type { Locale } from "@/lib/translations";

// Quien ya eligió idioma vuelve a ese idioma. A quien llega por primera vez con el navegador
// en otro idioma solo se le SUGIERE el cambio: Google pide no redirigir por idioma detectado,
// porque el rastreador dejaría de ver una de las dos versiones.
export default function LanguagePreference() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    const stored = storedLocale();
    if (stored && stored !== locale) {
      window.location.replace(`${alternatePath(pathname, stored)}${window.location.search}${window.location.hash}`);
      return;
    }
    if (stored) return;
    const browser: Locale = (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
    // El idioma del navegador solo existe en el cliente; se lee una vez tras hidratar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (browser !== locale) setSuggested(browser);
  }, [locale, pathname]);

  if (!suggested) return null;

  return (
    <div
      role="region"
      aria-label={suggested === "en" ? "Language suggestion" : "Sugerencia de idioma"}
      className="fixed inset-x-3 bottom-24 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/15 bg-[#062c24] px-4 py-3 text-sm text-white shadow-2xl"
    >
      <a
        href={alternatePath(pathname, suggested)}
        onClick={() => rememberLocale(suggested)}
        className="font-semibold text-[#69d8cb] underline underline-offset-4"
      >
        {suggested === "en" ? "View this page in English" : "Ver esta página en español"}
      </a>
      <button
        type="button"
        onClick={() => {
          rememberLocale(locale);
          setSuggested(null);
        }}
        aria-label={suggested === "en" ? "Dismiss" : "Cerrar"}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
