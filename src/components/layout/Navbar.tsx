"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/experiences", key: "experiences" },
  { href: "/gallery", key: "gallery" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const { locale } = useParams<{ locale: string }>();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-teal-900/90 backdrop-blur text-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="font-bold text-xl tracking-wide">
          Kin-Ha
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {links.map(({ href, key }) => (
            <Link key={key} href={`/${locale}${href}`} className="hover:text-teal-300 transition">
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href={`/${locale === "es" ? "en" : "es"}`}
            className="text-sm border border-teal-400 px-3 py-1 rounded-full hover:bg-teal-700 transition"
          >
            {locale === "es" ? "EN" : "ES"}
          </Link>
          <Link
            href={`/${locale}/booking`}
            className="bg-teal-400 text-teal-900 font-semibold px-5 py-2 rounded-full text-sm hover:bg-teal-300 transition"
          >
            {t("booking")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-teal-900 px-4 pb-4 flex flex-col gap-3 text-sm">
          {links.map(({ href, key }) => (
            <Link key={key} href={`/${locale}${href}`} onClick={() => setOpen(false)} className="hover:text-teal-300">
              {t(key)}
            </Link>
          ))}
          <Link href={`/${locale === "es" ? "en" : "es"}`} className="text-teal-400">
            {locale === "es" ? "English" : "Español"}
          </Link>
        </div>
      )}
    </header>
  );
}
