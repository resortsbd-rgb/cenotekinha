// Catálogo de tours SIN precios: el precio lo muestra Bókun (o se cotiza por WhatsApp).
// Stripe temporarily disabled — enable when STRIPE_SECRET_KEY is configured
// import Stripe from 'stripe';
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' });

export const TOURS = [
  {
    id: 'atv-cenotes',
    nameEs: 'Aventura Kin-Ha',
    nameEn: 'Kin-Ha Jungle Adventure',
    descEs: 'ATV por la selva, 3 tirolesas, Cenote Blanca Flor, Cenote Kin-Ha, comida mexicana y degustación de tequila. Opción de ATV individual disponible.',
    descEn: 'Jungle ATV, 3 zip lines, Blanca Flor Cenote, Kin-Ha Cenote, Mexican lunch and tequila tasting. Individual ATV option available.',
    duration: '4h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/atv-jungle_3b7c5d3f.jpg',
    featured: true,
  },
  {
    id: 'cenote-dual',
    nameEs: 'Dos Cenotes Kin-Ha',
    nameEn: 'Kin-Ha Two Cenotes',
    descEs: 'Descubre Blanca Flor, abierto al cielo, y la caverna subterránea de Kin-Ha. Incluye guía y degustación de tequila.',
    descEn: 'Discover open-air Blanca Flor and the underground Kin-Ha cavern. Guide and tequila tasting included.',
    duration: '3h',
    maxPeople: 20,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-kinha-1_354574cd.jpg',
  },
  {
    id: 'ecuestre-cenotes',
    nameEs: 'Caballos y Cenotes',
    nameEn: 'Horses & Cenotes',
    descEs: 'Paseo a caballo por la selva + acceso a cenotes. Guía certificado incluido.',
    descEn: 'Horseback ride through the jungle + cenote access. Certified guide included.',
    duration: '4h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/cenote-cave_02f834b4.jpg',
  },
  {
    id: 'experiencia-completa',
    nameEs: 'Aventura Completa Kin-Ha',
    nameEn: 'Kin-Ha Complete Adventure',
    descEs: 'Sistema dual + ATV + caballos + almuerzo yucateco.',
    descEn: 'Dual system + ATV + horses + Yucatecan lunch.',
    duration: '5-6h',
    maxPeople: 15,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663403066106/Zp7c8E6uddmsrRA2xBjMah/atv-jungle_3b7c5d3f.jpg',
  },
];
