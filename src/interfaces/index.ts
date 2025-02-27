import { StaticImageData } from 'next/image';

export interface AnalyticCardProps {
  title: string;
  views: number;
  value: number;
  change: string;
}
export type EthBalanceContextType = {
  ethBalance: string;
  embeddedWallet: any;
  refreshBalance: () => Promise<void>;
  chainName: string;
};
export interface ChannelCardProps {
  title: string;
  goLive?: () => void;
  streamId?: string;
  playbackId?: string;
  host?: string;
  image: StaticImageData;
}
export interface VideoCardProps {
  title: string;
  onAction: () => void;
  imageUrl: StaticImageData | string;
  createdAt?: Date;
}
export interface Stream {
  id: string;
  name: string;
  playbackId: string;
  streamKey: string;
  createdAt?: Date;
}

export interface PopupProps {
  // showOptions: boolean;
  // toggleOptions: () => void;
  // optionsRef: React.RefObject<HTMLDivElement>;
  streamId: string;
  playbackId: string;
}
