import { useState, useEffect } from 'react';
import type { Src } from '@livepeer/react';
import { getSrc } from '@livepeer/react/external';
import { Livepeer } from 'livepeer';
import api from '@/utils/api';

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

const getThumbnailUrl = (vttUrl: string) => {
  return vttUrl.replace('thumbnails/thumbnails.vtt', 'thumbnails/keyframes_0.png');
};

export const useFetchPlaybackId = (playbackId: string | null) => {
  const [playbackInfo, setPlaybackInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    if (!playbackId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/playback/${playbackId}`);
        if (response?.data?.meta?.source) {
          const thumbnailSource = response.data.meta.source.find((item: any) => item.hrn === 'Thumbnails');
          if (thumbnailSource) {
            const url = getThumbnailUrl(thumbnailSource.url);
            setThumbnailUrl(url);
          }
        }
        setPlaybackInfo(response?.data || {});
      } catch (err: any) {
        setError(err.message || 'Failed to fetch playback data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playbackId]);

  return { playbackInfo, thumbnailUrl, loading, error };
};

export const useFetchStreamPlaybackId = (playbackId: string | null) => {
  const [playbackInfo, setPlaybackInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    if (!playbackId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/playback/${playbackId}`);
        if (response?.data?.meta?.source) {
          const thumbnailSource = response.data.meta.source.find((item: any) =>
            item.hrn.toLowerCase().includes('thumbnail')
          );
            if (thumbnailSource) {
              const url = getThumbnailUrl(thumbnailSource.url);
              setThumbnailUrl(url);
            }
        }
        setPlaybackInfo(response?.data || {});
      } catch (err: any) {
        setError(err.message || 'Failed to fetch playback data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playbackId]);

  return { playbackInfo, thumbnailUrl, loading, error };
};