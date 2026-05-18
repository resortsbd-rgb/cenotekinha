// Stripe temporarily disabled — enable when STRIPE_SECRET_KEY is configured
// import Stripe from 'stripe';
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' });

export const TOURS = [
  {
    id: 'cenote-dual',
    nameEs: 'Dos Cenotes Kin-Ha',
    nameEn: 'Kin-Ha Two Cenotes',
    descEs: 'Acceso a Cenote Kin-Ha + Blanca Flor (laguna). Snorkel, guía certificado.',
    descEn: 'Access to Cenote Kin-Ha + Blanca Flor (lagoon). Snorkel, certified guide.',
    priceMXN: 430,
    duration: '3h',
    maxPeople: 20,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-kinha-1_354574cd.jpg',
  },
  {
    id: 'atv-cenotes',
    nameEs: 'ATV, Tirolesas y Cenotes',
    nameEn: 'ATV, Zip Lines & Cenotes',
    descEs: 'ATV por la selva + acceso a cenotes. Add-ons: caballos +$10 USD, seguro ATV $5 USD.',
    descEn: 'Jungle ATV + cenote access. Add-ons: horses +$10 USD, ATV insurance $5 USD.',
    priceMXN: 1060,
    duration: '4h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/atv-jungle_3b7c5d3f.jpg',
  },
  {
    id: 'ecuestre-cenotes',
    nameEs: 'Caballos y Cenotes',
    nameEn: 'Horses & Cenotes',
    descEs: 'Paseo a caballo por la selva + acceso a cenotes. Guía certificado incluido.',
    descEn: 'Horseback ride through the jungle + cenote access. Certified guide included.',
    priceMXN: 1170,
    duration: '4h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-cave_02f834b4.jpg',
  },
  {
    id: 'experiencia-completa',
    nameEs: 'Aventura Completa Kin-Ha',
    nameEn: 'Kin-Ha Complete Adventure',
    descEs: 'Sistema dual + ATV + caballos + almuerzo yucateco. Add-on: seguro ATV $5 USD.',
    descEn: 'Dual system + ATV + horses + Yucatecan lunch. Add-on: ATV insurance $5 USD.',
    priceMXN: 1350,
    duration: '5-6h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/atv-jungle_3b7c5d3f.jpg',
  },
];
