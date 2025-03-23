import { useCallback, useEffect, useState } from 'react';
import api from '@/utils/api';

interface ViewMetrics {
  viewCount: number;
  errorRate: number;
}

export const usePlaybackMetrics = (playbackId: string | null, refreshInterval: number = 10000) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState<ViewMetrics | null>(null);

  // Memoized fetch function
  const fetchPlaybackMetrics = useCallback(async () => {
    if (!playbackId) {
      setError('Playback ID is missing');
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/data/views/query/total/${playbackId}`);
      if (response.status === 200) {
        setViews(response.data);
      } else {
        setViews({ viewCount: 0, errorRate: 0 });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch playback metrics');
      console.error('Error fetching playback metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [playbackId]);

  // Initial fetch when component mounts or dependencies change
  useEffect(() => {
    fetchPlaybackMetrics();
  }, [fetchPlaybackMetrics]);

  // Set up interval for periodic refreshes
  useEffect(() => {
    if (!refreshInterval || refreshInterval <= 0) return;

    const intervalId = setInterval(() => {
      fetchPlaybackMetrics();
    }, refreshInterval);

    // Clean up interval on unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [fetchPlaybackMetrics, refreshInterval]);

  return { views, loading, error, refetch: fetchPlaybackMetrics };
};
