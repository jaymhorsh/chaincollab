'use client';
import { getPlaybackInfo } from '@/lib/livepeer';
import { useEffect, useState } from 'react';
import { getSrc } from '@livepeer/react/external';
import { PlayerLoading } from '@/components/templates/player/player/Player';
import PlayerWithChat from './PlayerWithChat';

export default async function PlayerPage({ params }: { params: { playbackId: string } }) {
  const [customization, setCustomization] = useState({
    bgColor: '#ffffff',
    fontSize: '16',
    textColor: '#000000',
  });

  // Read customization settings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('channelCustomization');
    if (stored) {
      setCustomization(JSON.parse(stored));
    }
  }, []);

  const inputSource = await getPlaybackInfo(params.playbackId);
  const src = getSrc(inputSource);

  return src ? (
    <div
      style={{
        backgroundColor: customization.bgColor,
        color: customization.textColor,
        fontSize: customization.fontSize + 'px',
      }}
      className="w-full max-w-2xl mx-auto"
    >
      <PlayerWithChat src={src} />
    </div>
  ) : (
    <PlayerLoading>
      <div className="absolute flex flex-col bg-black-secondary-text inset-0 justify-center items-center">
        <span className="text-sm text-white">Video is not available.</span>
        <span className="text-sm text-white">
          Please try refreshing the page in a few seconds.
        </span>
      </div>
    </PlayerLoading>
  );
}
