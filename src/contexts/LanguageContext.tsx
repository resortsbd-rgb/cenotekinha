"use client";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/translations";

// Module-level store — bypasses RSC boundary limitations with React context
let _locale: Locale = "es";
const _listeners = new Set<() => void>();

function _notify() {
  _listeners.forEach((fn) => fn());
}

// Initialize from localStorage on first client load
if (typeof window !== "undefined") {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("kin-ha-locale");
  } catch {
    // Navegación privada o almacenamiento bloqueado: se usa el idioma del navegador.
  }
  if (stored === "es" || stored === "en") {
    _locale = stored;
  } else {
    // Primera visita: español solo si el navegador está en español.
    _locale = (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
  }
  document.documentElement.lang = _locale;
}

export function setLocale(l: Locale) {
  if (_locale === l) return;
  _locale = l;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("kin-ha-locale", l);
    } catch {
      // Sin almacenamiento: el idioma vale solo para esta visita.
    }
    document.documentElement.lang = l;
  }
  _notify();
}

export function useLanguage() {
  const locale = useSyncExternalStore(
    (listener) => {
      _listeners.add(listener);
      return () => _listeners.delete(listener);
    },
    () => _locale,
    () => "es" as Locale, // server snapshot — always default on SSR
  );

  return { locale, setLocale };
}

// Keep LanguageProvider as a passthrough so the layout import still works
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
