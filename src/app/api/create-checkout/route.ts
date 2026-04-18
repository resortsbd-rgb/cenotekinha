import { NextResponse } from 'next/server';

// Stripe temporarily disabled — re-enable when STRIPE_SECRET_KEY is configured
export async function POST() {
  return NextResponse.json({ error: 'Stripe not configured yet' }, { status: 503 });
}
