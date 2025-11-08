'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCreateCheckoutSession } from '@/hooks/queries/useSubscription';
import { STRIPE_PLANS } from '@/lib/stripe';

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const createCheckoutSession = useCreateCheckoutSession();

  const handleUpgrade = async (plan: 'PRO' | 'BUSINESS') => {
    if (!session) {
      router.push('/login?redirect=/pricing');
      return;
    }

    const priceId = STRIPE_PLANS[plan].priceId;
    await createCheckoutSession.mutateAsync({ priceId });
  };

  const plans = [
    {
      name: 'FREE',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Design Studio',
      features: [
        '3 designs per month',
        'Basic templates',
        'PNG export only',
        'Standard resolution',
        'Watermarked exports',
      ],
      cta: session ? 'Current Plan' : 'Get Started',
      popular: false,
      tier: 'FREE' as const,
    },
    {
      name: 'PRO',
      price: '$9.99',
      period: 'per month',
      description: 'For individuals and small businesses',
      features: [
        'Unlimited designs',
        'All premium templates',
        'PNG, JPG, PDF exports',
        'High resolution (300 DPI)',
        'No watermarks',
        'Priority support',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      tier: 'PRO' as const,
    },
    {
      name: 'BUSINESS',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and agencies',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Brand kit & templates',
        'SVG export',
        'API access',
        'Custom fonts',
        'Dedicated support',
      ],
      cta: 'Upgrade to Business',
      popular: false,
      tier: 'BUSINESS' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Choose the perfect plan for your design needs. Upgrade or downgrade at any time.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const isCurrentPlan = session?.user.subscriptionTier === plan.tier;
              const canUpgrade = !session || 
                (session.user.subscriptionTier === 'FREE' && plan.tier !== 'FREE') ||
                (session.user.subscriptionTier === 'PRO' && plan.tier === 'BUSINESS');

              return (
                <Card
                  key={plan.name}
                  className={`relative ${
                    plan.popular
                      ? 'border-indigo-600 shadow-xl scale-105'
                      : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-indigo-600">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <svg
                            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      disabled={isCurrentPlan || !canUpgrade || createCheckoutSession.isPending}
                      onClick={() => {
                        if (plan.tier === 'FREE') {
                          router.push('/register');
                        } else {
                          handleUpgrade(plan.tier);
                        }
                      }}
                    >
                      {isCurrentPlan
                        ? 'Current Plan'
                        : createCheckoutSession.isPending
                        ? 'Processing...'
                        : canUpgrade
                        ? plan.cta
                        : 'Downgrade'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American
                Express) through our secure payment processor, Stripe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time from your
                account settings. You'll continue to have access until the end of
                your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee on all paid plans. If
                you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
