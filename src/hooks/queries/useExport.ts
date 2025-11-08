import { useMutation, useQuery } from '@tanstack/react-query';
import type { ExportOptions } from '@/types';

export function useExportDesign() {
  return useMutation({
    mutationFn: async ({
      designId,
      options,
    }: {
      designId: string;
      options: ExportOptions;
    }) => {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designId, ...options }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to start export');
      }
      return res.json();
    },
  });
}

export function useExportStatus(jobId: string | null) {
  return useQuery({
    queryKey: ['export', jobId],
    queryFn: async () => {
      const res = await fetch(`/api/export/${jobId}`);
      if (!res.ok) throw new Error('Failed to fetch export status');
      return res.json();
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Stop polling if completed or failed
      return status === 'completed' || status === 'failed' ? false : 2000;
    },
  });
}

export function useExportHistory() {
  return useQuery({
    queryKey: ['exports'],
    queryFn: async () => {
      const res = await fetch('/api/exports');
      if (!res.ok) throw new Error('Failed to fetch export history');
      return res.json();
    },
  });
}
