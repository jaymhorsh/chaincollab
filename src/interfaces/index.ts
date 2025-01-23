export interface AnalyticCardProps {
  title: string;
  views: number;
  value: number;
  change: string;
}

export interface ChannelCardProps {
  title: string;
  goLive?: () => void;
  streamId?: string;
  playbackId?: string;
  host?: string;
}
export interface VideoCardProps {
  title: string;
  onAction: () => void;
  imageUrl: string;
}
export interface Stream {
  id: string;
  name: string;
  playbackId: string;
  streamKey: string;
}
