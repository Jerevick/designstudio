import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Design } from '@/types';

export function useDesigns() {
  return useQuery({
    queryKey: ['designs'],
    queryFn: async () => {
      const res = await fetch('/api/designs');
      if (!res.ok) throw new Error('Failed to fetch designs');
      return res.json();
    },
  });
}

export function useDesign(id: string) {
  return useQuery({
    queryKey: ['designs', id],
    queryFn: async () => {
      const res = await fetch(`/api/designs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch design');
      const data = await res.json();
      return data.design;
    },
    enabled: !!id,
  });
}

export function useCreateDesign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      templateId: string;
      name: string;
      data: any;
    }) => {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create design');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}

export function useUpdateDesign(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Design>) => {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update design');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      queryClient.setQueryData(['designs', id], data.design);
    },
  });
}

export function useDeleteDesign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete design');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}
