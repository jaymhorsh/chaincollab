'use client';
import React, { useRef, useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { AnalyticCardProps, ChannelCardProps, VideoCardProps } from '@/interfaces';
import {Popup } from "../Popup"


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

export const ChannelCard = ({ title, goLive, streamId, playbackId, host }: ChannelCardProps) => {
  // const [showOptions, setShowOptions] = useState(false);
  // const optionsRef = useRef<HTMLDivElement | null>(null);

  // const toggleOptions = () => {
  //   setShowOptions((prevShowOptions) => !prevShowOptions);
  // };
  return (
    <div className="w-full h-full relative">
      {/* Image */}
      <div className="w-full h-[180px] bg-background-gray rounded-md"></div>
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-black-primary-text text-lg capitalize pt-2">{title}</div>
        </div>
        <div className="ml-auto pt-2">
          {/* Popup */}

          <Popup
            // showOptions={showOptions}
            // toggleOptions={toggleOptions}
            streamId={streamId}
            playbackId={playbackId}
            host={host}
          />
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

export const VideoCard = ({ title, onAction, imageUrl }: VideoCardProps) => {
  return (
    <div className="w-full h-full relative">
      {/* Image Container */}
      <div
        className="w-full h-28 py-3 cursor-pointer bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={onAction}
      />
      {/* Content Container */}
      <p className="font-bold text-black-secondary-text uppercase text-sm">{title}</p>
    </div>
  );
};
