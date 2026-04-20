import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const products = [
  {
    id: 'berserk',
    name: 'Berserk – The Black Swordsman',
    description: 'Premium 3D-printed Guts figurine. Hand-finished with industrial-grade resin and matte black coating.',
    price: 49999, // $499.99 in cents
  },
  {
    id: 'ironman',
    name: 'Iron Man – The Armored Avenger',
    description: 'Premium 3D-printed Iron Man figurine. Arc reactor LED detail with metallic gold & crimson finish.',
    price: 49999,
  },
  {
    id: 'drone',
    name: 'V-9 Scout Drone – Autonomous Recon',
    description: 'Premium 3D-printed V-9 Scout Drone model. Stealth composite finish with articulated rotors.',
    price: 49999,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
