import { Livepeer } from 'livepeer';
import type { ClipPayload, NewStreamPayload } from 'livepeer/models/components';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const livepeer = new Livepeer({
  apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
});

export const getPlaybackInfoUncached = cache(async (playbackId: string) => {
  try {
    const playbackInfo = await livepeer.playback.get(playbackId);

    if (!playbackInfo.playbackInfo) {
      console.error('Error fetching playback info', playbackInfo);

      return null;
    }
    return playbackInfo.playbackInfo;
  } catch (e) {
    console.error(e);
    return null;
  }
});

export const getPlaybackInfo = unstable_cache(
  async (playbackId: string) => getPlaybackInfoUncached(playbackId),
  ['get-playback-info'],
  {
    revalidate: 120,
  },
);

export const createStreamClip = async (opts: ClipPayload) => {
  const result = await livepeer.stream.createClip(opts);
  return result;
};
