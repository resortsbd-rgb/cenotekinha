"use client";

import { useSyncExternalStore } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Tour } from "@/lib/stripe";

// Nada que suscribir: el valor solo se calcula al montar en el navegador.
const noSubscribe = () => () => {};

/**
 * Línea de promoción con fecha de fin real. Se muestra solo en el navegador
 * y solo mientras esté vigente: el 1 de noviembre desaparece sola, sin tocar el código.
 */
export default function PromoLine({ promo, className = "" }: { promo?: Tour["promo"]; className?: string }) {
  const { locale } = useLanguage();
  const active = useSyncExternalStore(
    noSubscribe,
    () => (promo ? Date.now() < Date.parse(promo.until) : false),
    () => false,
  );
  if (!promo || !active) return null;
  return <span className={`block ${className}`}>{promo[locale]}</span>;
}
