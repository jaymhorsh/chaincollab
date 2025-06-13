'use client';
import React, { useEffect, useState, useRef } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { AnalyticCardProps, ChannelCardProps, VideoCardProps } from '@/interfaces';
import { AssetPopup, Popup } from '../Popup';
import Image, { StaticImageData } from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { VideoPlayer } from '../templates/dashboard/VideoPlayer';
import { useFetchPlaybackId, useFetchStreamPlaybackId } from '@/app/hook/usePlaybckInfo';
import { usePlaybackMetrics } from '@/app/hook/usePlaybackView';
import { Bars } from 'react-loader-spinner';
import { useViewMetrics } from '@/app/hook/useViewerMetrics';
import { FaLock } from 'react-icons/fa6';
import { useGetAssetGate } from '@/app/hook/useAssetGate';
// import Link from 'next/link';
// import { useLivepeerAnalytics } from '@/app/hook/useLivepeerAnalytics';

interface VideoStreamCardProps {
  playbackId: string;
  streamName: string;
  imageUrl: StaticImageData | string;
  creatorId: string;
  lastSeen: Date;
  status: boolean; // true means Live; false means Idle
}
// Analytic Card
export const AnalyticCard = ({ title, views, value, playtimeMins, loading }: AnalyticCardProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="border flex flex-col justify-between bg-background-gray border-border-gray rounded-lg p-4 gap-y-5 h-full">
        <div>
          <p className="text-2xl font-bold break-words">{title}</p>
        </div>
        {loading ? (
          <Bars width={25} height={25} color="#3351FF" />
        ) : (
          <div>
            {views ? (
              <p className="text-4xl font-extrabold tracking-wide">{views} Views</p>
            ) : (
              <p className="text-2xl font-bold tracking-wide">{playtimeMins}</p>
            )}
            <p className="text-xs flex items-center gap-1">
              <span className="text-black-secondary-text">{value}</span>
              <span>
                {(value ?? 0) < 0 ? (
                  <BiSolidDownArrow className="text-orange-drop text-xs" />
                ) : (
                  <BiSolidUpArrow className="text-green-drop text-xs" />
                )}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
// Channel Card
export const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  goLive,
  streamId,
  playbackId,
  image,
  playb,
  lastSeen,
  status,
}) => {
  const { thumbnailUrl, loading } = useFetchStreamPlaybackId(playb);
  const { viewerMetrics: viewstream } = useViewMetrics({ playbackId: playb });
  return (
    <div className="w-full h-full flex flex-col group">
      <div className="w-full bg-gray rounded-md overflow-hidden relative">
        {loading ? (
          <div className="flex items-center w-full max-sm:h-[220px] h-[300px] lg:h-[200px] justify-center">
            <p>Loading</p>
          </div>
        ) : (
          <Image
            src={thumbnailUrl || image}
            alt={title}
            className="rounded-md w-full max-sm:h-[220px] h-[300px] lg:h-[200px] object-cover"
            width={400}
            height={180}
          />
        )}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {viewstream?.viewCount} views
        </div>
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center gap-1">
          {status ? (
            <>
              <div className="bg-[#04EB2A] h-[6px] w-[6px] rounded-full" />
              <span className="text-xs text-black-primary-text font-medium select-none">Live</span>
            </>
          ) : (
            <>
              <div className="bg-gray-200 h-[6px] w-[6px] rounded-full" />
              <span className="text-xs text-gray-500 font-medium select-none">Idle</span>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          <h3 className="font-bold text-black-primary-text text-lg capitalize pt-2 break-words">{title}</h3>
        </div>
        <div className="ml-auto pt-2">
          {streamId && playbackId && <Popup streamId={streamId} playbackId={playbackId} />}
        </div>
      </div>
      <div>
        <div className="text-sm text-[#838294] ">Last Active {lastSeen ? lastSeen.toDateString() : ''}</div>
      </div>
      <div className="flex justify-start mt-auto">
        <button
          className="mt-2 bg-main-blue cursor-pointer text-white py-2 text-sm font-bold px-4 rounded-[6px]"
          onClick={goLive}
        >
          Go Live
        </button>
      </div>
    </div>
  );
};
// Asset Card
export const VideoCard: React.FC<VideoCardProps> = ({ title, imageUrl, createdAt, playbackId, assetData, format }) => {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { views: videocount } = usePlaybackMetrics(playbackId || '');
  const { thumbnailUrl, loading } = useFetchPlaybackId(assetData.playbackId);
  const handlePlayClick = () => {
    if (assetData.playbackId) {
      window.open(`/player/${assetData.playbackId}?id=${encodeURIComponent(assetData.id)}`, '_blank');
    }
  };

  return (
    <div className="w-full h-full flex flex-col group">
      <div className="w-full bg-gray-200 rounded-md overflow-hidden relative">
        {loading ? (
          <div className="flex items-center w-full max-sm:h-[220px] h-[300px] lg:h-[200px] justify-center">
            <p>Loading</p>
          </div>
        ) : (
          <Image
            src={thumbnailUrl || imageUrl}
            alt={assetData.name}
            className="rounded-md w-full max-sm:h-[220px] h-[300px] lg:h-[200px] object-cover"
            width={400}
            height={180}
          />
        )}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {videocount?.viewCount || 0} views
        </div>
        <div className="absolute inset-0 flex justify-center items-center group-hover:bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
          <button onClick={handlePlayClick} className="text-white text-4xl opacity-0 group-hover:opacity-100">
            <FaPlay />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <h2 className="font-bold text-black-primary-text text-lg capitalize pt-2 break-words">
            {title}
            {format ? `.${format}` : ''}
          </h2>
        </div>
        <div className="ml-auto">
          <AssetPopup asset={assetData} />
        </div>
      </div>
      <div className="flex justify-start">
        <p className="text-sm text-gray-500">{createdAt ? createdAt.toDateString() : ''}</p>
      </div>
    </div>
  );
};
// Stream
export const VideoStreamCard: React.FC<VideoStreamCardProps> = ({
  playbackId,
  streamName,
  imageUrl,
  creatorId,
  lastSeen,
  status,
}) => {
  const { thumbnailUrl, loading } = useFetchStreamPlaybackId(playbackId);
  const { viewerMetrics: viewstream } = useViewMetrics({ playbackId: playbackId });
  const host = process.env.NEXT_PUBLIC_BASE_URL;

  const playbackUrl = host
    ? `${host.includes('localhost') ? 'http' : 'https'}://${host}/view/${playbackId}?streamName=${encodeURIComponent(
        streamName || '',
      )}&id=${encodeURIComponent(creatorId || '')}`
    : null;

  const handlePlayClick = () => {
    if (playbackUrl) {
      window.open(playbackUrl, '_blank');
    }
  };

  return (
    <div className="flex gap-3 p-2 cursor-pointer group">
      {/* Thumbnail Container */}
      <div className="relative flex-shrink-0 w-40 h-24">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <p className="text-sm">Loading...</p>
          </div>
        ) : (
          <>
            <Image
              src={thumbnailUrl || imageUrl || '/assets/default-thumbnail.jpg'}
              alt={streamName}
              fill
              className="rounded object-cover"
            />
            {/* Status overlay */}
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded flex items-center gap-1">
              {status ? (
                <>
                  <div className="bg-[#04EB2A] h-[6px] w-[6px] rounded-full" />
                  <span className="text-xs text-black-primary-text font-medium select-none">Live</span>
                </>
              ) : (
                <>
                  <div className="bg-gray-200 h-[6px] w-[6px] rounded-full" />
                  <span className="text-xs text-gray-500 font-medium select-none">Idle</span>
                </>
              )}
            </div>
          </>
        )}

        {/* Hover overlay with play button */}
        <div className="absolute inset-0 flex justify-center items-center bg-opacity-0 group-hover:bg-opacity-60 transition duration-300">
          <button onClick={handlePlayClick} className="text-white text-2xl opacity-0 group-hover:opacity-100">
            <FaPlay />
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="flex flex-col justify-between flex-grow overflow-hidden">
        <p className="text-sm text-black capitalize line-clamp-2">{streamName}</p>
        <div>
          <p className="text-sm text-gray-500">{viewstream?.viewCount || 0} views</p>
          <p className="text-xs text-gray-500">Last Seen: {lastSeen.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

// vidooooooooooooooooo
export const StreamVideoCard: React.FC<VideoCardProps> = ({ title, imageUrl, createdAt, playbackId, assetData }) => {
  const { video, loading: gateLoading, hasAccess } = useGetAssetGate(assetData.playbackId);
  const { views: videocount } = usePlaybackMetrics(playbackId || '');
  const { thumbnailUrl, loading } = useFetchPlaybackId(assetData.playbackId);
  const isGated = !hasAccess && video?.viewMode !== 'free';
  const handlePlayClick = () => {
    if (assetData.playbackId) {
      window.open(`/player/${assetData.playbackId}?id=${encodeURIComponent(assetData.id)}`, '_blank');
    }
  };
  return (
    <>
      <div className="flex gap-3 p-2 cursor-pointer group">
        {/* Thumbnail Container */}
        <div className="relative flex-shrink-0 w-40 h-24">
          {loading || gateLoading ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <p className="text-sm">Loading...</p>
            </div>
          ) : (
            <>
              <Image
                src={thumbnailUrl || imageUrl || '/assets/default-thumbnail.jpg'}
                alt={title}
                fill
                className="rounded object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                {assetData.videoSpec && assetData.videoSpec.duration
                  ? `${Math.floor(assetData.videoSpec.duration / 3600)
                      .toString()
                      .padStart(2, '0')}:${Math.floor((assetData.videoSpec.duration % 3600) / 60)
                      .toString()
                      .padStart(2, '0')}:${Math.floor(assetData.videoSpec.duration % 60)
                      .toString()
                      .padStart(2, '0')}`
                  : '00:00:00'}
              </span>
            </>
          )}
          {/* Hover overlay with play button */}
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-0 group-hover:bg-opacity-60 transition duration-300">
            {isGated ? (
              <div onClick={handlePlayClick} className="text-main-blue text-4xl opacity-0 group-hover:opacity-100">
                <FaLock />
              </div>
            ) : (
              <button onClick={handlePlayClick} className="text-white text-4xl opacity-0 group-hover:opacity-100">
                <FaPlay />
              </button>
            )}
          </div>
        </div>
        {/* Video Details */}
        <div className="flex flex-col justify-between flex-grow overflow-hiden">
          <p className="text-sm text-black capitalize line-clamp-2">{title}</p>
          <div className="">
            <p className="text-sm text-gray-500">{videocount?.viewCount} views</p>
            <p className="text-xs text-gray-500">{createdAt ? createdAt.toDateString() : ''}</p>
          </div>
        </div>
      </div>
    </>
  );
};
