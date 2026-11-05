"use client";
import { createContext, useContext } from "react";
import type { Locale } from "@/lib/translations";

// El idioma lo decide la URL: "/" es español y "/en" es inglés.
// Así cada idioma llega completo en el HTML y los buscadores lo pueden indexar por separado.
const LanguageContext = createContext<Locale>("es");

export function LanguageProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return { locale: useContext(LanguageContext) };
}

export const LOCALE_STORAGE_KEY = "kin-ha-locale";

/** Recuerda el idioma elegido. Sin almacenamiento disponible, simplemente no se recuerda. */
export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Navegación privada o almacenamiento bloqueado.
  }
}

export function storedLocale(): Locale | null {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "es" || value === "en" ? value : null;
  } catch {
    return null;
  }
}
