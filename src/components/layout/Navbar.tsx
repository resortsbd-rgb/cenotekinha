"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { translations } from "@/lib/translations";
import { useLanguage, setLocale } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/experiences", label: t.nav.tours },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSetLocale(l: "es" | "en") {
    setLocale(l);
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-teal-900/95 backdrop-blur shadow-lg"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-teal-400 font-bold text-xl tracking-wide">
            Cenotes <span className="text-white">Kin-Ha</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-teal-300 transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle — inline to avoid nested-component remount issue */}
          <div className="flex items-center gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSetLocale("es")}
              className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
                locale === "es" ? "text-teal-400" : "text-white/50 hover:text-white/80"
              }`}
            >
              ES
            </button>
            <span className="text-white/30">|</span>
            <button
              type="button"
              onClick={() => handleSetLocale("en")}
              className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
                locale === "en" ? "text-teal-400" : "text-white/50 hover:text-white/80"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={`https://wa.me/529987777498?text=${encodeURIComponent(t.whatsapp_msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <Link
            href="/booking"
            className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-2 rounded-full text-sm transition shadow"
          >
            {t.hero.cta_secondary}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-teal-900 px-4 pb-5 pt-2 flex flex-col gap-3 text-sm text-white border-t border-teal-800">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 hover:text-teal-300 transition-colors border-b border-teal-800/50"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleSetLocale("es")}
                className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
                  locale === "es" ? "text-teal-400" : "text-white/50 hover:text-white/80"
                }`}
              >
                ES
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => handleSetLocale("en")}
                className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
                  locale === "en" ? "text-teal-400" : "text-white/50 hover:text-white/80"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="text-center bg-teal-500 px-3 py-2 rounded-full text-xs font-semibold"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
