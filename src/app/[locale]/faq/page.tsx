import { useTranslations } from "next-intl";

const faqs = [
  { q: "¿Cuál es el horario?", a: "Abrimos de 8am a 5pm todos los días." },
  { q: "¿Puedo llevar niños?", a: "Sí, niños mayores de 5 años pueden participar en snorkel." },
  { q: "¿Hay que saber nadar?", a: "Para snorkel sí, para otros tours se proporcionan chalecos salvavidas." },
  { q: "¿Cómo llego al cenote?", a: "Estamos a 20 min de Playa del Carmen, con opción de transporte incluido." },
];

export default function FaqPage() {
  const t = useTranslations("faq");
  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-12">{t("title")}</h1>
      <div className="space-y-6">
        {faqs.map(({ q, a }) => (
          <div key={q} className="border-b border-teal-100 pb-6">
            <h3 className="text-lg font-semibold text-teal-900 mb-2">{q}</h3>
            <p className="text-gray-600">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
