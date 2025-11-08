import { useMutation, useQuery } from '@tanstack/react-query';

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (tier: 'PRO' | 'BUSINESS') => {
      const res = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
      
      return data;
    },
  });
}

export function useCancelSubscription() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to cancel subscription');
      return res.json();
    },
  });
}

export function useCreatePortalSession() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/subscriptions/portal', {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to create portal session');
      const data = await res.json();
      
      // Redirect to billing portal
      if (data.url) {
        window.location.href = data.url;
      }
      
      return data;
    },
  });
}
