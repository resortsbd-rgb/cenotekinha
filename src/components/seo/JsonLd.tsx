// Datos estructurados (JSON-LD): la información que Google lee para entender
// qué es Cenotes Kin-Ha y qué tours vende.
// Va en un <script> nativo, como indica la guía de Next.js
// (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
