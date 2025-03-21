'use client';
import React, { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { AnalyticCardProps, ChannelCardProps, VideoCardProps } from '@/interfaces';
import { AssetPopup, Popup } from '../Popup';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { DemoPlay } from '../templates/dashboard/DemoPlay';
import { useFetchPlaybackId, useFetchStreamPlaybackId } from '@/app/hook/usePlaybckInfo';
import { usePlaybackMetrics } from '@/app/hook/usePlaybackView';
import { Bars } from 'react-loader-spinner';

export const AnalyticCard = ({ title, views, change, value, playtimeMins, loading }: AnalyticCardProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="border flex flex-col justify-between bg-background-gray border-border-gray rounded-lg p-4 gap-y-5 h-full">
        <div>
          <p className="text-2xl font-bold break-words">{title}</p>
          <p className="text-black-secondary-text  font-medium text-sm">{change}</p>
        </div>
        {loading ? (
          <Bars color="#3351FF" height={25} width={25} />
        ) : (
          <div>
            {views ? (
              <p className="text-4xl font-extrabold tracking-wide">{views}</p>
            ) : (
              <p className="text-2xl font-bold tracking-wide">{playtimeMins}</p>
            )}
            <p className="text-xs flex items-center gap-1">
              <span className="text-black-secondary-text">{value}</span>
              <span>
                {value < 0 ? (
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

export const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  goLive,
  streamId,
  playbackId,
  image,
  playb,
  lastSeen,
}) => {
  const { thumbnailUrl, loading } = useFetchStreamPlaybackId(playb);
  const { views: viewstream, error } = usePlaybackMetrics(playb);
  console.log('viewMetricsstream:', viewstream);
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

export const VideoCard: React.FC<VideoCardProps> = ({ title, imageUrl, createdAt, playbackId, assetData, format }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { views: videocount, error } = usePlaybackMetrics(playbackId || '');
  
  const { thumbnailUrl, loading } = useFetchPlaybackId(assetData.playbackId);
  const handlePlayClick = () => {
    setIsDialogOpen(true);
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
          {videocount?.viewCount} views
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
            {format ? `.${assetData.videoSpec.format}` : ''}
          </h2>
        </div>
        <div className="ml-auto">
          <AssetPopup asset={assetData} />
        </div>
      </div>
      <div className="flex justify-start">
        <p className="text-sm text-gray-500">{createdAt ? createdAt.toDateString() : ''}</p>
      </div>
      <DemoPlay
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        playbackId={assetData.playbackId}
        title={assetData.name}
      />
    </div>
  );
};
