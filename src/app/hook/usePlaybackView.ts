import api from '@/utils/api';
import { useEffect, useState } from 'react';

interface ViewMetricProps {
  playbackId: string;
}
interface ViewMetrics {
  viewCount: number;
  errorRate: number;
}
export const usePlaybackMetrics = (playbackId: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [views, setViews] = useState<any>(null);
  useEffect(() => {
    if (!playbackId) {
      console.error('playbackId is missing');
      return;
    }

    const fetchData = async () => {
      if (!playbackId) {
        console.error('playbackId is missing');
        return;
      }
      setLoading(true);
      try {
        const response = await api.get(`/data/views/query/total/${playbackId}`);
        if (response.status === 200) {
          setViews(response.data);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch View Metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playbackId]);

  useEffect(() => {
    // console.log("Updated viewer:", views);
  }, [views]);

  return { views, loading, error };
};
