import { useState, useEffect } from 'react';
import type { Src } from '@livepeer/react';
import { getSrc } from '@livepeer/react/external';
import { Livepeer } from 'livepeer';

export function usePlaybackInfo(playbackId: string | null) {
  const [src, setSrc] = useState<Src[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playbackId) return;

    const livepeer = new Livepeer({
      apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
    });

    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('playbackIdHook:', playbackId);
        const playbackInfo = await livepeer.playback.get(playbackId);
        const srcData = getSrc(playbackInfo.playbackInfo);
        setSrc(srcData);
      } catch (err: any) {
        setError(err.message || 'Error fetching playback info');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playbackId]);

  return { src, loading, error };
}


// export const getPlaybackSource = () => {
//     const playbackInfo = await livepeer.playback.get(playbackId);
  
//     const src = getSrc(playbackInfo.playbackInfo);
  
//     return src;
//   };