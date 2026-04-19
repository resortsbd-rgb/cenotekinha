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
  const stored = localStorage.getItem("kin-ha-locale") as Locale | null;
  if (stored === "es" || stored === "en") {
    _locale = stored;
  }
}

export function setLocale(l: Locale) {
  if (_locale === l) return;
  _locale = l;
  if (typeof window !== "undefined") {
    localStorage.setItem("kin-ha-locale", l);
  }
  console.log("[LanguageStore] locale →", l, `(${_listeners.size} subscribers)`);
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
