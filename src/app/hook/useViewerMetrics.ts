import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { getDateRange } from '@/utils/dateUtils';

interface ViewMetricsProps {
  playbackId?: string;
  assetId?: string;
  streamId?: string;
  from?: string;
  to?: string;
}
interface ViewMetrics {
  viewCount: number;
  playtimeMins: number;
  ttffMs: number;
  rebufferRatio: number;
  errorRate: number;
  exitsBeforeStart: number;
}
interface ViewerMetrics {
  viewCount: number;
  errorRate: number;
}
// export const useViewerMetrics = (
//  { playbackId,
//   assetId,
//   streamId,
//   from,
//   to,
// }: ViewMetricsProps) => {
//   const {user} = usePrivy();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [viewMetrics, setViewMetrics] = useState<ViewMetrics | null>(null);
//  useEffect(() => {
//     if (!user) return;
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get(
//           `/data/views/query?${playbackId}&${assetId}&${streamId}&${user?.wallet?.address}&${from}&${to}`
//         );
//         if (response.status === 200) {
//           setViewMetrics(response.data[0]);
//         } else {
//           setError(`Error: ${response.status} - ${response.statusText}`);
//         }
//       } catch (err: any) {
//         setError(err.message || "Failed to fetch View Metrics");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [playbackId, assetId, streamId, from, to]);

//   useEffect(() => {
//     // console.log("Updated Metrics:", viewMetrics);
//   }, [viewMetrics]);

//   return { viewMetrics, loading, error };
// };

// Add the getViewerNum function below
export const useViewerMetrics = ({
  playbackId,
  assetId,
  streamId,
  filter = 'all', // Default to "all"
}: ViewMetricsProps & { filter?: 'all' | 'month' | 'year' }) => {
  const { user } = usePrivy();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMetrics, setViewMetrics] = useState<ViewMetrics | null>(null);

  useEffect(() => {
    if (!user) return;

    const { from, to } = getDateRange(filter); // Get the date range based on the filter
    console.log(filter);
    const fetchData = async () => {
      try {
        setLoading(true);

        // Construct query parameters dynamically
        const params = new URLSearchParams();
        if (playbackId) params.append('playbackId', playbackId);
        if (assetId) params.append('assetId', assetId);
        if (streamId) params.append('streamId', streamId);
        if (user?.wallet?.address) params.append('userAddress', user.wallet.address);
        if (from) params.append('from', from.toString());
        if (to) params.append('to', to.toString());

        const response = await api.get(`/data/views/query?${params.toString()}`);
        console.log('API response:', response);

        if (response.status === 200) {
          setViewMetrics(response.data[0]);
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
  }, [playbackId, assetId, streamId, filter, user]);

  return { viewMetrics, loading, error };
};
interface ViewMetricProps {
  playbackId: string;
}

export const useViewMetrics = ({ playbackId }: ViewMetricProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewerMetrics, setViewMetrics] = useState<ViewerMetrics | null>(null);
  console.log(viewerMetrics);
  const { user } = usePrivy();
  useEffect(() => {
    if (!user && !playbackId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/data/views/now?${playbackId}&${user?.wallet?.address}`);
        console.log('response:', response);
        if (response.status === 200) {
          setViewMetrics(response.data[0]);
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
  }, [user, playbackId]);

  useEffect(() => {
    console.log('Updated viewMetrics:', viewerMetrics);
  }, [viewerMetrics]);

  return { viewerMetrics, loading, error };
};
