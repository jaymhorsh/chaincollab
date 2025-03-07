'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { IoMdClose } from 'react-icons/io';
import DemoClient from '@/components/DemoClient';
import { useEffect, useState } from 'react';
import { getPlaybackInfo } from '@/lib/livepeer';
import { getSrc } from '@livepeer/react/external';
import type { Src } from '@livepeer/react';
import { PlayerLoading } from '../player/player/Player';

interface VideoPlayerDialogProps {
  open: boolean;
  onClose: () => void;
  playbackId: string;
  title: string;
}

export const DemoPlay: React.FC<VideoPlayerDialogProps> = ({ open, onClose, playbackId, title }) => {
  const [src, setSrc] = useState<Src[] | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(src, playbackId);

  useEffect(() => {
    async function loadPlaybackInfo() {
      try {
        const inputSource = await getPlaybackInfo(playbackId);
        console.log('inputSource:', inputSource); // Check what you receive here

        const srcData = getSrc(inputSource);
        console.log('srcData:', srcData); // Verify the output from getSrc

        setSrc(srcData);
      } catch (error) {
        console.error('Failed to load playback info', error);
      } finally {
        setLoading(false);
      }
    }
    loadPlaybackInfo();
  }, [playbackId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!src) {
  //   return ( <PlayerLoading>
  //         <div className="absolute flex flex-col bg-black-secondary-text inset-0 justify-center items-center">
  //           <span className="text-sm text-white">Video is not available.</span>
  //           <span className="text-sm text-white">Please try refreshing the page in a few seconds.</span>
  //         </div>
  //       </PlayerLoading>)
  // }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg',
          )}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title || 'Video Player'}</h2>
            <Dialog.Close asChild>
              <button onClick={onClose} className="text-2xl">
                <IoMdClose />
              </button>
            </Dialog.Close>
          </div>
          <div>
            <DemoClient src={src} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
