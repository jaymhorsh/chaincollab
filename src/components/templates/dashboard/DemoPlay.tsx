'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { IoMdClose } from 'react-icons/io';
import DemoClient from '@/components/DemoClient';
import { PlayerLoading } from '../player/player/Player';
import { usePlaybackInfo } from '@/app/hook/usePlaybckInfo';

interface VideoPlayerDialogProps {
  open: boolean;
  onClose: () => void;
  playbackId: string;
  title: string;
}

export const DemoPlay: React.FC<VideoPlayerDialogProps> = ({ open, onClose, playbackId, title }) => {
  const { src, loading, error } = usePlaybackInfo(playbackId);
  // console.log(src, loading, error);
  if (loading) {
    return (
      <PlayerLoading>
        <div className="absolute flex flex-col bg-black-secondary-text inset-0 justify-center items-center">
          <span className="text-sm text-white">Loading video...</span>
        </div>
      </PlayerLoading>
    );
  }

  if (error || !src) {
    return (
      <PlayerLoading>
        <div className="absolute flex flex-col bg-black-secondary-text inset-0 justify-center items-center">
          <span className="text-sm text-white">{error || 'Video is not available.'}</span>
          <span className="text-sm text-white">Please try refreshing the page in a few seconds.</span>
        </div>
      </PlayerLoading>
    );
  }

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
