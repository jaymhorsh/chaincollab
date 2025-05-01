import { StaticImageData } from 'next/image';

export interface AnalyticCardProps {
  title: string;
  views?: number | string;
  value?: number;
  change?: string;
  playtimeMins?: string;
  loading?: boolean;
}
export type EthBalanceContextType = {
  ethBalance: string;
  embeddedWallet: any;
  refreshBalance: () => Promise<void>;
};
export interface ChannelCardProps {
  title: string;
  goLive?: () => void;
  streamId?: string;
  playbackId?: string;
  host?: string;
  image: StaticImageData;
  playb: string;
  lastSeen: Date;
  status: boolean;
}
export interface VideoCardProps {
  title: string;
  assetData: Asset;
  imageUrl: StaticImageData | string;
  createdAt?: Date;
  format?: string;
  assetId?: string;
  playbackId: string;
  creatorId?: string;
}
export interface Stream {
  id: string;
  name: string;
  playbackId: string;
  streamKey: string;
  createdAt?: Date;
  creatorId?: { type: string; value: string };
}

export interface PopupProps {
  streamId: string;
  playbackId: string;
}
export interface AssetPopProps {
  // assetId?: string;
  // name?: string;
  asset: any;
}

export interface Asset {
  id: string;
  name: string;
  size: number;
  source: { type: string };
  status: { phase: string; updatedAt: number };
  userId: string;
  createdAt: number; // You can convert this to a Date in your UI
  creatorId: { type: string; value: string };
  projectId: string;
  videoSpec: { format: string; bitrate: number; duration: number };
  playbackId: string;
  createdByTokenName: string;
  downloadUrl: string;
  playbackUrl: string;
  assetId: string;
  duration: number;
}
export interface Product {
  _id?: string;
  user_id: string;
  name: string;
  price: number;
  imageUrl: any;
  description?: string;
  currency: string;
  quantity: number;
}
