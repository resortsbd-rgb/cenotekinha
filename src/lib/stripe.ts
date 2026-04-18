import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export const TOURS = [
  {
    id: 'cenote-dual',
    nameEs: 'Sistema Dual Kin-Ha',
    nameEn: 'Kin-Ha Dual System',
    descEs: 'Acceso a Cenote Kin-Ha (cueva) + Blanca Flor (laguna). Snorkel, guía certificado.',
    descEn: 'Access to Cenote Kin-Ha (cave) + Blanca Flor (lagoon). Snorkel, certified guide.',
    priceMXN: 450,
    duration: '3h',
    maxPeople: 20,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-kinha-1_354574cd.jpg',
  },
  {
    id: 'cenote-cave',
    nameEs: 'Portal Cueva + Rappel',
    nameEn: 'Cave Portal + Rappel',
    descEs: 'Rappel de descenso al cenote cueva + snorkel + guía espeleológico.',
    descEn: 'Rappel descent into cave cenote + snorkel + speleological guide.',
    priceMXN: 750,
    duration: '4h',
    maxPeople: 12,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-cave_02f834b4.jpg',
  },
  {
    id: 'experiencia-completa',
    nameEs: 'Experiencia Completa',
    nameEn: 'Complete Experience',
    descEs: 'Sistema dual + ATV selva + caballos + almuerzo yucateco + fotos profesionales. Todo incluido.',
    descEn: 'Dual system + jungle ATV + horses + Yucatecan lunch + professional photos. All-inclusive.',
    priceMXN: 1200,
    duration: 'Full day',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/atv-jungle_3b7c5d3f.jpg',
  },
];
