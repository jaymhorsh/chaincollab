import { useState, useEffect } from 'react';
import type { Src } from '@livepeer/react';
import { getSrc } from '@livepeer/react/external';
import { Livepeer } from 'livepeer';

export async function usePlaybackInfo(playbackId: string | null) {
  const [src, setSrc] = useState<Src[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 
  const livepeer = new Livepeer({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
  });
  useEffect(() => {
    if (!playbackId) return;
    setLoading(true);
    async function fetchData() {
        console.log('playbackIdHook:', playbackId); 
      try {
        const playbackInfo = await livepeer.playback.get(playbackId!);
        const src = getSrc(playbackInfo.playbackInfo);
        setSrc(src);
        setLoading(false);
      } catch(err:any) {
        setError(err.message || 'Error fetching playback info');
      }
    }
    fetchData();
  }, [playbackId]);

  return { src, loading, error };
}


// export const getPlaybackSource = () => {
//     const playbackInfo = await livepeer.playback.get(playbackId);
  
//     const src = getSrc(playbackInfo.playbackInfo);
  
//     return src;
//   };