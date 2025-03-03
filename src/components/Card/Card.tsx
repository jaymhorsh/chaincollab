'use client';
import React, { useRef, useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { AnalyticCardProps, ChannelCardProps, VideoCardProps } from '@/interfaces';
import { Popup } from '../Popup';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

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
  return (
    <div className="w-full h-full relative">
      {/* Image */}
      <div className="w-full bg--gray rounded-md">
        <Image src={image} alt="channel image" className="rounded-md w-full" style={{ objectFit: 'contain' }} />
      </div>
      {/* Title and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-black-primary-text text-lg capitalize pt-2">{title}</h2>
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

export const VideoCard = ({ title, onAction, imageUrl, createdAt }: VideoCardProps) => {
  return (
    <div className="w-full h-full relative group">
      {/* Image */}
      <div className="w-full bg-gray-200 rounded-md overflow-hidden relative">
        <Image src={imageUrl} objectFit="contain" className="rounded-md w-full" alt="channel image" />
        {/* Overlay Play Button */}
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white text-4xl" onClick={onAction}>
            <FaPlay />
          </button>
        </div>
      </div>
      {/* Title */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <h2 className="font-bold text-black-primary-text text-lg capitalize">{title}</h2>
        </div>
        <div className="ml-auto">
          {/* Popup */}
          <Popup streamId="1" playbackId="1" />
        </div>
      </div>
      <div className="flex justify-start">
        <p className="text-sm text-gray-500">{createdAt ? createdAt.toDateString() : ''}</p>
      </div>
    </div>
  );
};
