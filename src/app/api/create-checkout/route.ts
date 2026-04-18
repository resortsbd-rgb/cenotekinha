import { NextRequest, NextResponse } from 'next/server';
import { stripe, TOURS } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { tourId, quantity, locale } = await req.json();
    const tour = TOURS.find(t => t.id === tourId);
    if (!tour) return NextResponse.json({ error: 'Tour not found' }, { status: 404 });

    const name = locale === 'en' ? tour.nameEn : tour.nameEs;
    const description = locale === 'en' ? tour.descEn : tour.descEs;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card' as const],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { name, description, images: [tour.image] },
          unit_amount: tour.priceMXN * 100,
        },
        quantity: quantity || 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/booking?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/experiences`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
