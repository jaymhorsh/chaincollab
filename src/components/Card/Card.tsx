'use client';
import React, { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { AnalyticCardProps, ChannelCardProps, VideoCardProps } from '@/interfaces';
import { AssetPopup, Popup } from '../Popup';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { DemoPlay } from '../templates/dashboard/DemoPlay';
import { useFetchPlaybackId } from '@/app/hook/usePlaybckInfo';

export const AnalyticCard = ({ title, views, change, value }: AnalyticCardProps) => {
  return (
    <div className="w-full h-full ">
      <div className=" border flex flex-col justify-center bg-background-gray border-border-gray rounded-lg p-4 gap-y-5">
        <div className="">
          <p className="text-2xl  font-bold">{title}</p>
          <p className="-text-black-secondary-text font-medium text-sm">{change}</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold tracking-wide">{views}</p>
          <p className="text-xs  flex items-center gap-1">
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
      </div>
    </div>
  );
};

export const ChannelCard: React.FC<ChannelCardProps> = ({ title, goLive, streamId, playbackId, image }) => {
  const { thumbnailUrl, error } = useFetchPlaybackId(playbackId ?? null);
  // console.log('thurm', thumbnailUrl, error);
  return (
    <div className="w-full h-full relative">
      {/* Image */}
      <div className="w-full bg--gray rounded-md">
        <Image
          src={thumbnailUrl || image}
          alt={title}
          objectFit="inherit"
          className="rounded-md w-full max-sm:h-[220px] h-[200px]  object-cover"
          width={400}
          height={180}
        />
      </div>
      {/* Title and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-black-primary-text text-lg capitalize pt-2 break-words">{title}</h2>
        </div>
        <div className="ml-auto pt-2">
          {streamId && playbackId && <Popup streamId={streamId} playbackId={playbackId} />}
        </div>
      </div>
      <div className="flex justify-start">
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

export const VideoCard: React.FC<VideoCardProps> = ({ title, imageUrl, createdAt, assetData, format }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { thumbnailUrl, loading } = useFetchPlaybackId(assetData.playbackId);

  const handlePlayClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full h-full relative group">
      {/* Thumbnail Image with hover overlay */}
      <div className="w-full bg-gray-200 rounded-md overflow-hidden relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <Image
            src={thumbnailUrl || imageUrl}
            alt={assetData.name}
            objectFit="inherit"
            className="rounded-md w-full max-sm:h-[220px] h-[300px] lg:h-[200px]  object-cover"
            width={400}
            height={180}
          />
        )}
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
          <button onClick={handlePlayClick} className="text-white text-4xl opacity-0 group-hover:opacity-100">
            <FaPlay />
          </button>
        </div>
      </div>
      {/* Title and Popup */}
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
      {/* Video Player Dialog */}
      <DemoPlay
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        playbackId={assetData.playbackId}
        title={assetData.name}
      />
    </div>
  );
};
