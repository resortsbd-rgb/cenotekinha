"use client";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    name: "María G.",
    origin: "Ciudad de México",
    text: "Una experiencia mágica que no olvidaré jamás. El cenote cueva es absolutamente impresionante.",
    rating: 5,
  },
  {
    name: "James T.",
    origin: "USA",
    text: "The cave cenote was absolutely breathtaking. Our guide was amazing and made us feel safe the whole time.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    origin: "France",
    text: "Incroyable! Le système dual est unique. La grotte et la lagune, c'est deux mondes différents en une journée.",
    rating: 5,
  },
  {
    name: "Roberto M.",
    origin: "Colombia",
    text: "Mejor que Xcaret, más auténtico y personal. El agua cristalina y los guías son de primer nivel.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="bg-teal-900 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-teal-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
          Reviews
        </p>
        <h2 className="text-white text-4xl font-bold mb-14">
          {t.testimonials.title}
        </h2>

        <div className="relative min-h-[180px] flex items-center justify-center">
          <div key={current} className="animate-fade-in text-center">
            <div className="flex justify-center gap-1 mb-5">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-white text-lg md:text-xl italic leading-relaxed max-w-2xl mx-auto mb-6">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <p className="text-teal-300 font-semibold">{testimonial.name}</p>
            <p className="text-teal-500 text-sm">{testimonial.origin}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-8 h-2 bg-teal-400" : "w-2 h-2 bg-teal-700"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
