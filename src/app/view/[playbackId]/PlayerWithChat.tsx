import type { Src } from '@livepeer/react';
import { PlayerWithControls } from '@/components/templates/player/player/Player';

export default function PlayerWithChat({ src, title, playbackId }: { src: Src[]; title: string; playbackId: string }) {
  return <PlayerWithControls src={src} title={title} playbackId={playbackId} />;
}
