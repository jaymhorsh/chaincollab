import type { Src } from '@livepeer/react';
import { PlayerWithControls } from '@/components/templates/player/player/Player';

export default function PlayerWithChat({ src }: { src: Src[] }) {
  return <PlayerWithControls src={src} />;
}
