import { trackEvent, gtmEvent } from '@/components/Analytics';

// Eventos de reserva
export const trackBookingStart = (tourId: string, tourName: string) => {
  trackEvent('InitiateCheckout', {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
  });
  gtmEvent('booking_start', {
    tour_id: tourId,
    tour_name: tourName,
  });
};

export const trackBookingComplete = (tourId: string, tourName: string, value: number) => {
  trackEvent('Purchase', {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
    value: value,
    currency: 'MXN',
  });
  gtmEvent('booking_complete', {
    tour_id: tourId,
    tour_name: tourName,
    value: value,
    currency: 'MXN',
  });
};

// Eventos de WhatsApp
export const trackWhatsAppClick = (source: string, tourName?: string) => {
  trackEvent('Contact', {
    content_name: 'WhatsApp',
    source: source,
    tour: tourName || 'general',
  });
  gtmEvent('whatsapp_click', {
    source: source,
    tour: tourName || 'general',
  });
};

// Eventos de interés en tours
export const trackTourView = (tourId: string, tourName: string, price: number) => {
  trackEvent('ViewContent', {
    content_name: tourName,
    content_ids: [tourId],
    content_type: 'product',
    value: price,
    currency: 'MXN',
  });
  gtmEvent('tour_view', {
    tour_id: tourId,
    tour_name: tourName,
    price: price,
  });
};

// Eventos de formularios
export const trackFormSubmit = (formName: string, formType: string) => {
  trackEvent('Lead', {
    content_name: formName,
    content_category: formType,
  });
  gtmEvent('form_submit', {
    form_name: formName,
    form_type: formType,
  });
};

// Eventos de navegación
export const trackSectionView = (sectionName: string) => {
  gtmEvent('section_view', {
    section: sectionName,
  });
};

// Eventos de CTA
export const trackCTAClick = (ctaName: string, location: string) => {
  gtmEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
};
