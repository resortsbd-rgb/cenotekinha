import Image from "next/image";
import Link from "next/link";
import { TOURS } from "@/lib/stripe";
import { tourPages, tourSlugs, type TourSlug } from "@/lib/tour-pages";

export default function TourDetail({ slug }: { slug: TourSlug }) {
  const page = tourPages[slug];
  const tour = TOURS.find((item) => item.id === page.id);
  if (!tour) return null;
  const url = `https://cenotekinha.com/tours/${slug}`;
  const whatsapp = `https://wa.me/529987777498?text=${encodeURIComponent(`Hola, quiero consultar disponibilidad y precio de ${tour.nameEs}.`)}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: page.title,
    description: page.description,
    url,
    image: tour.image,
    touristType: "Visitantes de Puerto Morelos y Riviera Maya",
    provider: { "@type": "Organization", name: "Cenotes Kin-Ha", url: "https://cenotekinha.com/" },
  };

  return (
    <article className="bg-white pb-20 pt-24 text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-6xl px-4">
        <nav aria-label="Ruta de navegación" className="mb-8 text-sm text-gray-600">
          <Link href="/">Inicio</Link> / <Link href="/experiences">Experiencias</Link> / {tour.nameEs}
        </nav>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 font-semibold uppercase tracking-widest text-teal-700">Ruta de los Cenotes · Puerto Morelos</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">{page.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-700">{page.intro}</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl bg-teal-700 px-7 py-4 font-semibold text-white hover:bg-teal-800">Consultar disponibilidad y precio</a>
            <p className="mt-3 text-sm text-gray-600">Confirmamos tarifa, horarios y condiciones antes de reservar.</p>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-2xl lg:min-h-110">
            <Image src={tour.image} alt={tour.nameEs + " en Cenotes Kin-Ha, Puerto Morelos"} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
          </div>
        </div>
        <section className="mt-20" aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="mb-6 text-3xl font-bold">Lo que vivirás</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {page.highlights.map((item) => <li key={item} className="rounded-xl bg-teal-50 p-5 text-lg">✓ {item}</li>)}
          </ul>
        </section>
        <section className="mt-20 max-w-3xl" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mb-6 text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {page.questions.map(({ q, a }) => <div key={q}><h3 className="mb-2 text-xl font-semibold">{q}</h3><p className="leading-relaxed text-gray-700">{a}</p></div>)}
          </div>
        </section>
        <section className="mt-20 border-t border-gray-200 pt-10" aria-labelledby="other-tours-title">
          <h2 id="other-tours-title" className="mb-5 text-2xl font-bold">Explora otras experiencias</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {tourSlugs.filter((other) => other !== slug).map((other) => <li key={other}><Link className="font-semibold text-teal-700 underline hover:text-teal-900" href={`/tours/${other}`}>{tourPages[other].title}</Link></li>)}
          </ul>
        </section>
      </div>
    </article>
  );
}
