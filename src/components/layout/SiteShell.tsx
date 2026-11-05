import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LanguagePreference from "@/components/layout/LanguagePreference";
import JsonLd from "@/components/seo/JsonLd";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { businessJsonLd, websiteJsonLd } from "@/lib/structuredData";
import type { Locale } from "@/lib/translations";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Estructura común de todas las páginas. Cada idioma tiene su propio layout raíz
// para que <html lang> salga correcto en el HTML desde el servidor.
export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Datos del negocio para buscadores (dirección, horario, mapa, redes) */}
        <JsonLd data={businessJsonLd(locale)} />
        <JsonLd data={websiteJsonLd(locale)} />
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '840518511778515');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=840518511778515&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MBBHBPKW');
            `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MBBHBPKW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <LanguageProvider locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <LanguagePreference />
        </LanguageProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
