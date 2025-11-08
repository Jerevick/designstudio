import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

export const STRIPE_PLANS = {
  PRO: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || '',
    features: [
      'Unlimited designs',
      '200+ premium templates',
      'High-resolution export (300-600 DPI)',
      'No watermarks',
      'All formats (PNG, JPEG, PDF, SVG)',
      'Priority rendering',
      'Custom branding',
    ],
  },
  BUSINESS: {
    name: 'Business',
    price: 29.99,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || '',
    features: [
      'Everything in Pro',
      'Team collaboration (up to 5 users)',
      'Brand kit',
      'Bulk export',
      'API access',
      'Priority support',
      'Usage analytics',
    ],
  },
} as const;
