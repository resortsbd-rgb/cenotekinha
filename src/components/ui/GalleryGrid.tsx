"use client";
import Image from "next/image";

import { translations } from "@/lib/translations";


const BASE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/";

const images = [
  { src: BASE_URL + "cenote-kinha-1_354574cd.jpg", alt: "Cenote Kin-Ha turquoise water" },
  { src: BASE_URL + "cenote-kinha-2_c5d7c755.jpg", alt: "Cenote Kin-Ha view" },
  { src: BASE_URL + "zipline-cenote_0c385721.jpg", alt: "Zipline over cenote" },
  { src: BASE_URL + "zipline-water_b7ba34e0.jpg", alt: "Zipline water action" },
  { src: BASE_URL + "atv-jungle_3b7c5d3f.jpg", alt: "ATV jungle tour" },
  { src: BASE_URL + "atv-tour_9bf62408.jpg", alt: "ATV tour group" },
  { src: BASE_URL + "horses-jungle_34a1d854.jpg", alt: "Horses in the jungle" },
  { src: BASE_URL + "cenote-cave_02f834b4.jpg", alt: "Cave cenote stalactites" },
  { src: BASE_URL + "cenote-underground_157ca0cf.jpg", alt: "Underground cenote" },
];

export default function GalleryGrid() {
  const t = translations.es;

  return (
    <section id="gallery" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 mb-3">
            {t.gallery.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t.gallery.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  const fallbacks = ["/images/hero1.png", "/images/hero2.png", "/images/hero3.png"];
                  el.src = fallbacks[i % fallbacks.length];
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
