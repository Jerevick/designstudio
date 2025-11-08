import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTemplates(category?: string) {
  return useQuery({
    queryKey: ['templates', category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.set('category', category);

      const res = await fetch(`/api/templates?${params}`);
      if (!res.ok) throw new Error('Failed to fetch templates');
      const data = await res.json();
      return data.templates;
    },
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: async () => {
      const res = await fetch(`/api/templates/${id}`);
      if (!res.ok) throw new Error('Failed to fetch template');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useFeaturedTemplates() {
  return useQuery({
    queryKey: ['templates', 'featured'],
    queryFn: async () => {
      const res = await fetch('/api/templates?featured=true');
      if (!res.ok) throw new Error('Failed to fetch featured templates');
      const data = await res.json();
      return data.templates;
    },
  });
}
