"use client";
import {
  DisableAudioIcon,
  DisableVideoIcon,
  EnableAudioIcon,
  EnableVideoIcon,
  EnterFullscreenIcon,
  ExitFullscreenIcon,
  LoadingIcon,
  OfflineErrorIcon,
  PictureInPictureIcon,
  StartScreenshareIcon,
  StopScreenshareIcon,
} from "@livepeer/react/assets";
import * as Broadcast from "@livepeer/react/broadcast";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getIngest } from "@livepeer/react/external";
import { toast } from "sonner";
import { Settings } from "./Settings";
import styles from "./BroadcastScroll.module.css";
import Link from "next/link";
import { useState } from "react";
import { VideoCard } from "@/components/Card/Card";
import { FaPlus } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";


interface Streams {
  streamKey: string;
  playbackUrl: string;
  playbackId: string;
  streamName: string;
}

export function BroadcastWithControls({
  streamName,
  streamKey,
  playbackUrl,
  playbackId,
}: Streams) {
  const [isChatVisible, setChatVisible] = useState(false);
  console.log("broasadcst", streamName, streamKey, playbackUrl, playbackId);
  const toggleChat = () => {
    setChatVisible((prev) => !prev);
  };
  const videos = [
    {
      title: "Title 1",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/dbd5/37f3/4d381ee70bca3a9e7795da780d92aca1?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Td00xEQxD8dOVfonC3OwZaa83vn8tSUWm0DDs8rAsGQ8m72JLYBj2YsxekS-OjflSKVrB-GtpHGJwYLHsq7y5ikmJhS6Abrio5GLCkD0FFhumxt~ydbhGK~MV~emKu4q2OuTQwUlEvV1aqm~T9eRRXnk8CXGdr5-pJ31weNHHUXRW7tSs~BNiCtmM783qLRz7Hp8ZW0-m649-W1CJBU~GFGeysguG8pdHwOx1hlCVFkSTBiGz49b7MEW5NlIHj09uAyrBpTyU1G2ULG~wQ54ZDMklVUlNsi1NWTi0TNoB-yXlGyxB0MlpLkBgw-46R8iW621YFOGQYjJpFtgNeFgMA__",
    },
    {
      title: "Title 2",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/3215/c6a2/baf26130f143986d29b11b93692c398e?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mx2FM~J6FrPPlcDmiWxVjUFU8NJGM0uwYHdyDE404cCZ4i1U3ANRGH9xTgesDIkHD41KBumug6O4gC~CtR0YqJtMqUmBjOfhijctUVzffD6vj~Ep9UO8ARlfR-6AZUS~ua081u7D8V8uxPfFDT0alzq0kocplnLRt20sdgNIAFHLdfvi6z~yvdhyI7u2kzgFmsW-fo77~qGg1ZcSHlGG2tJOsB9mjcKkHIIi3ZuLt7NiYhdYpIxgv0h1-9LlJAhIkCCwRo8XUS~h5ZFfqkuTvKQVHZvv27E0cqd6tPr8bpyBDRIGHFcdIAWhP-su~WQZsrYfxfiG9GlrwE-B7qwOng__",
    },
    {
      title: "Title 3",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/b3cc/c082/80d93de3738ee917c5396efb063566b1?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g6ZUpeYWC1tOEypxBc6h45e8pYbrWQQCPNcN~neROaSdV7PFBF5YTxGpSPHT7~TBjjSQk7JHCIjQDaqv-bOZz1B3SXlbxE4OGyuZ-7bd~5tPT5-DNd~2SJn2zHrNjQdQzVeAr8dsQIXQs1-dLBHlJWUq4LorcdgPW2v24lPzIZKAUJXvDgRVXGpnCRPHzSzUxYXdzqX4MtyIAXj0kaO2qBMrizNtdyj19olNF~um-k5qxDK22oMfbVv7GCrBDTOXME0GB0vo7sZBQ9ZPq6O4cno8pbvDcmzVXPFgKeg~2W7jLSV2B7ZskV8vCaRMROYvKCTiOPYflP-2R9vbagpNpQ__",
    },
    {
      title: "Title 3",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/b3cc/c082/80d93de3738ee917c5396efb063566b1?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g6ZUpeYWC1tOEypxBc6h45e8pYbrWQQCPNcN~neROaSdV7PFBF5YTxGpSPHT7~TBjjSQk7JHCIjQDaqv-bOZz1B3SXlbxE4OGyuZ-7bd~5tPT5-DNd~2SJn2zHrNjQdQzVeAr8dsQIXQs1-dLBHlJWUq4LorcdgPW2v24lPzIZKAUJXvDgRVXGpnCRPHzSzUxYXdzqX4MtyIAXj0kaO2qBMrizNtdyj19olNF~um-k5qxDK22oMfbVv7GCrBDTOXME0GB0vo7sZBQ9ZPq6O4cno8pbvDcmzVXPFgKeg~2W7jLSV2B7ZskV8vCaRMROYvKCTiOPYflP-2R9vbagpNpQ__",
    },
    {
      title: "Title 3",
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/b3cc/c082/80d93de3738ee917c5396efb063566b1?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g6ZUpeYWC1tOEypxBc6h45e8pYbrWQQCPNcN~neROaSdV7PFBF5YTxGpSPHT7~TBjjSQk7JHCIjQDaqv-bOZz1B3SXlbxE4OGyuZ-7bd~5tPT5-DNd~2SJn2zHrNjQdQzVeAr8dsQIXQs1-dLBHlJWUq4LorcdgPW2v24lPzIZKAUJXvDgRVXGpnCRPHzSzUxYXdzqX4MtyIAXj0kaO2qBMrizNtdyj19olNF~um-k5qxDK22oMfbVv7GCrBDTOXME0GB0vo7sZBQ9ZPq6O4cno8pbvDcmzVXPFgKeg~2W7jLSV2B7ZskV8vCaRMROYvKCTiOPYflP-2R9vbagpNpQ__",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(playbackUrl);
      toast.success("Stream link successfully copied!");
    } catch (err) {
      toast.error("Failed to copy the stream link.");
    }
  };

  return (
    <Broadcast.Root
      onError={(error) =>
        error?.type === "permissions"
          ? toast.error(
              "You must accept permissions to broadcast. Please try again."
            )
          : null
      }
      aspectRatio={16 / 9}
      ingestUrl={getIngest(streamKey)}
    >
      <div className="h-screen overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-3 w-full border-b border-green-400 h-[60px] bg-white">
          {/* Loading Indicator */}
          <BroadcastLoadingIndicator />
          {/* Channel and Session */}
          <div className="flex items-center gap-x-3">
            <button className=" flexx rounded-md bg-background-gray px-4 py-2">
              Change Channel
            </button>
            <button className="rounded-md bg-background-gray   px-4 py-2">
              Custom Channel
            </button>
            <button className="rounded-md bg-background-gray py-1 min-w-[100px] pl-3  flex flex-col">
              <span className="text-base font-medium">00:00:00</span>
              <span className="text-sm">Session</span>
            </button>
            <button className="rounded-md bg-background-gray py-1 min-w-[100px] pl-3  flex flex-col">
              <span className="text-base font-medium">0</span>
              <span className="text-sm">Followers</span>
            </button>
            <button className="rounded-md bg-background-gray py-1 min-w-[100px] pl-3  flex flex-col">
              <span className=" font-medium">0</span>
              <span className="text-sm">Viewers</span>
            </button>
          </div>
          {/* Start and Stop Broadcast */}
          <BroadcastTrigger />
        </div>
        {/* Body */}
        <div className="w-full h-screen grid grid-cols-12 gap-x-2 pt-1 overflow-hidden">
          {/* Streaming section*/}
          <section
            className={`col-span-12 md:col-span-8 overflow-y-auto ${styles.customScrollbar} mb-[63px]`}
          >
            <div className="w-full border-l border-border-gray bg-background-gray h-full">
              <BroadcastContainer />
              <div className="w-full ">
                {/* Copy & Visit Link */}
                <div className=" w-full p-3 border border-border-gray rounded-b-md  bg-white">
                  <div className="flex w-full justify-between items-center gap-x-3 ">
                    <div className="flex items-center gap-x-3">
                      <button className=" flex rounded-sm bg-background-gray h-[33px] items-center px-3">
                        <span className="text-sm text-black-primary-text font-medium select-none">
                          Play Ads
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Settings className="w-7 h-7 transition-all flex-shrink-0 text-black-primary-text hover:scale-110" />
                      <button
                        className="flex rounded-md bg-background-gray h-[33px] items-center px-3"
                        onClick={handleCopyLink}
                      >
                        <span className="text-sm text-black-secondary-text font-medium select-none">
                          Copy Link
                        </span>
                      </button>
                     
                      <button
                        className="flex rounded-md bg-background-gray h-[33px] items-center px-3"
                        onClick={() =>
                          window.open(
                            `${playbackUrl}?streamName=${streamName}`,
                            "_blank"
                          )
                        }
                      >
                        
                        <span className="text-sm text-black-secondary-text font-medium select-none">
                          View Link
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Basics info */}
                <div className="w-full border border-border-gray mt-2 rounded-t-md  h-full">
                  <div className="flex items-center gap-x-3 px-4  p-2 rounded-md">
                    <h1 className="text-base font-bold text-black-primary-text select-none">
                      Basics
                    </h1>
                    <button className=" flex rounded-md bg-background-gray h-[33px] items-center px-4">
                      <span className="text-xs text-black-secondary-text font-medium select-none">
                        Edit
                      </span>
                    </button>
                  </div>
                  <div className=" w-full p-3 pl-4 rounded-b-md bg-white border-t text-justify">
                    <div className="flex flex-col mb-3 gap-y-2">
                      <h1 className="text-base text-black-secondary-text font-medium select-none">
                        Title
                      </h1>
                      <input
                        value={"Olarekjdfdfjghfhdffffffff"}
                        disabled
                        className="w-full text-sm outline-none border bg-transparent p-3 text-black-secondary-text border-[#c2c2c2] rounded-md  font-medium select-none"
                      />
                    </div>
                    <div className="flex  flex-col gap-y-2">
                      <h1 className="text-base text-black-secondary-text font-medium select-none">
                        Description
                      </h1>
                      <textarea
                        value={""}
                        disabled
                        rows={3}
                        className="w-full text-sm outline-none border bg-transparent line-clamp-4 p-3 text-black-secondary-text border-[#c2c2c2] rounded-md font-medium select-none overflow-y-auto"
                      />
                    </div>
                  </div>
                </div>
                {/* Ads */}
                <div className="w-full border border-border-gray rounded-t-md mt-2">
                  <div className="flex items-center gap-x-3  p-2 px-4 rounded-md">
                    <h1 className="text-base text-black-primary-text font-bold select-none">
                      Ads
                    </h1>
                    <button className="flex rounded-md bg-background-gray h-[33px] items-center px-4">
                      <span className="text-xs text-black-secondary-text font-medium select-none">
                        Edit
                      </span>
                    </button>
                    <button className="flex rounded-md bg-background-gray h-[33px] items-center ml-auto px-4">
                      <span className="text-xs text-black-secondary-text font-medium select-none">
                        Preset
                      </span>
                    </button>
                  </div>
                  <div className="w-full  rounded-b-md p-4 rounded-md bg-white border-t text-justify">
                    <h1 className=" text-black-secondary-text font-medium">
                      Video
                    </h1>

                    <div className="grid grid-cols-4 lg:grid-cols-4 gap-2">
                      {videos
                        .slice(0, showAll ? videos.length : 3)
                        .map((video, index) => (
                          <VideoCard
                            key={index}
                            title={video.title}
                            onAction={() => {}}
                            imageUrl={video.imageUrl}
                          />
                        ))}
                      <div className="flex w-full flex-col">
                        <div className="w-full justify-center flex items-center h-28 rounded-md cursor-pointer bg-background-gray">
                          <RiVideoAddLine className="text-main-blue w-24 h-24" />
                        </div>
                      </div>
                    </div>
                    {videos.length > 3 && (
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-2 text-blue-500"
                      >
                        {showAll ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Chat Section */}
          <section
            className={`col-span-12 md:col-span-4 mb-[63px] ${styles.customScrollbar}`}
          >
            <div className="w-full border-2 rounded-md border-border-gray h-full flex flex-col">
              <div className="flex bg-background-gray items-center w-full">
                <h1 className="text-base px-4 py-3 rounded-md text-black-primary-text font-medium select-none">
                  Chat
                </h1>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Broadcast.Root>
  );
}

export const BroadcastContainer = () => {
  return (
    <Broadcast.Container className="flex relative  ">
      <Broadcast.Video
        title="Live streaming"
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      {/* Loading Indicator */}
      <Broadcast.LoadingIndicator className="w-full relative h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon className="w-8 h-8 animate-spin" />
        </div>
        <BroadcastLoading />
      </Broadcast.LoadingIndicator>
      {/* Error Indicator */}
      <Broadcast.ErrorIndicator
        matcher="not-permissions"
        className="absolute select-none inset-0 text-center  flex flex-col items-center justify-center gap-4 duration-1000 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
      >
        <OfflineErrorIcon className="h-[120px] w-full sm:flex hidden" />
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">Broadcast failed</div>
          <div className="text-sm text-gray-100">
            There was an error with broadcasting - it is retrying in the
            background.
          </div>
        </div>
      </Broadcast.ErrorIndicator>
      {/* Controls */}
      <BroadcastControls />
    </Broadcast.Container>
  );
};
export const BroadcastLoading = () => (
  <div className="w-full px-3 md:px-3 py-3 gap-3 flex-col-reverse flex aspect-video max-w-2xl mx-auto animate-pulse bg-white/10 overflow-hidden rounded-sm">
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 animate-pulse bg-white/5 overflow-hidden rounded-lg" />
        <div className="w-16 h-6 md:w-20 md:h-7 animate-pulse bg-white/5 overflow-hidden rounded-lg" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 animate-pulse bg-white/5 overflow-hidden rounded-lg" />
        <div className="w-7 h-7 animate-pulse bg-white/5 overflow-hidden rounded-lg" />
      </div>
    </div>
    <div className="w-full h-2 animate-pulse bg-white/5 overflow-hidden rounded-lg" />
  </div>
);

export const BroadcastTrigger = () => {
  return (
    <div className="flex items-center gap-2">
      <Broadcast.EnabledTrigger className="rounded-md ">
        <Broadcast.EnabledIndicator
          className="flex items-center bg-main-blue h-[40px] min-w-[150px] rounded-md text-black-primary-text px-4 justify-center"
          matcher={false}
        >
          <span className="text-base font-medium ">Start Stream</span>
        </Broadcast.EnabledIndicator>
        {/* End Stream Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Broadcast.EnabledIndicator
              className="flex items-center justify-center bg-red-500 h-[40px] w-full min-w-[150px] rounded-md text-black-primary-text px-4 cursor-pointer"
              matcher={true}
            >
              <span className="text-base text-black-primary-text font-medium">
                End Stream
              </span>
            </Broadcast.EnabledIndicator>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className=" p-6 flex flex-col w-[292px]  items-center rounded-md mr-2 z-10 bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              sideOffset={5}
            >
              <p className="text-black-primary-text font-medium text-base mb-4 text-center">
                Are you sure you want to end this Stream
              </p>
              <div className="flex gap-x-4">
                <DropdownMenu.Item
                  className="flex items-center cursor-pointer px-6 py-3 border  h-[40px] rounded-md text-black-primary-text justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-black-primary-text font-medium text-sm">
                    Cancel
                  </p>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center cursor-pointer px-6 py-3 bg-red-500 h-[40px] rounded-md text-black-primary-text justify-center">
                  <p className="text-black-primary-text font-medium text-sm">
                    End Stream
                  </p>
                </DropdownMenu.Item>
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Broadcast.EnabledTrigger>
    </div>
  );
};

export const BroadcastLoadingIndicator = () => {
  return (
    <Broadcast.LoadingIndicator asChild matcher={false}>
      <div className=" overflow-hidden h-[34px] rounded-md bg-background-gray  top-1 left-1 bg-black/50 flex items-center backdrop-blur">
        <Broadcast.StatusIndicator
          matcher="live"
          className="flex p-2 gap-2 items-center"
        >
          <div className="bg-[#34A853] h-3 w-3 rounded-full" />
          <span className="text-sm text-black-primary-text font-medium select-none">
            Live
          </span>
        </Broadcast.StatusIndicator>
        <Broadcast.StatusIndicator
          className="flex p-2 gap-2 items-center"
          matcher="pending"
        >
          <div className="bg-[#DC7609] h-3 w-3 rounded-full animate-pulse" />
          <span className="text-sm text-black-primary-text font-medium select-none">
            Pending
          </span>
        </Broadcast.StatusIndicator>
        <Broadcast.StatusIndicator
          className="flex p-2 gap-2 items-center"
          matcher="idle"
        >
          <div className="bg-[#00000033] animate-pulse h-3 w-3 rounded-full" />
          <span className="text-sm text-black-primary-text font-medium select-none">
            Offline
          </span>
        </Broadcast.StatusIndicator>
      </div>
    </Broadcast.LoadingIndicator>
  );
};

export const BroadcastControls = () => {
  return (
    <Broadcast.Controls
      autoHide={2000}
      className="flex flex-col-reverse mb-2 px-5  rounded-md"
    >
      <div className="flex justify-between bg-background-gray px-4 rounded-3xl h-[40px] gap-4">
        <div className="flex flex-1 items-center gap-3">
          <Broadcast.VideoEnabledTrigger className="w-7 h-7 hover:scale-110 text-black-primary-text transition-all flex-shrink-0">
            <Broadcast.VideoEnabledIndicator asChild matcher={false}>
              <DisableVideoIcon className="w-full h-full text-black-primary-text" />
            </Broadcast.VideoEnabledIndicator>
            <Broadcast.VideoEnabledIndicator asChild matcher={true}>
              <EnableVideoIcon className="w-full h-full" />
            </Broadcast.VideoEnabledIndicator>
          </Broadcast.VideoEnabledTrigger>
          <Broadcast.AudioEnabledTrigger className="w-7 h-7 hover:scale-110 text-red-500 transition-all flex-shrink-0">
            <Broadcast.AudioEnabledIndicator asChild matcher={false}>
              <DisableAudioIcon className="w-full h-full" />
            </Broadcast.AudioEnabledIndicator>
            <Broadcast.AudioEnabledIndicator asChild matcher={true}>
              <EnableAudioIcon className="w-full h-full" />
            </Broadcast.AudioEnabledIndicator>
          </Broadcast.AudioEnabledTrigger>
        </div>
        <div className="flex sm:flex-1 md:flex-[1.5] justify-end items-center gap-2.5">
          <Broadcast.FullscreenIndicator matcher={false} asChild>
            <Settings className="w-7 h-7 transition-all flex-shrink-0 text-black-primary-text hover:scale-110" />
          </Broadcast.FullscreenIndicator>

          <Broadcast.ScreenshareTrigger className="w-7 h-7 hover:scale-110 transition-all flex-shrink-0">
            <Broadcast.ScreenshareIndicator asChild>
              <StopScreenshareIcon className="w-full h-full text-black-primary-text" />
            </Broadcast.ScreenshareIndicator>

            <Broadcast.ScreenshareIndicator matcher={false} asChild>
              <StartScreenshareIcon className="w-full h-full text-black-primary-text" />
            </Broadcast.ScreenshareIndicator>
          </Broadcast.ScreenshareTrigger>

          <Broadcast.PictureInPictureTrigger className="w-7 h-7 hover:scale-110 text-black-primary-text transition-all flex-shrink-0">
            <PictureInPictureIcon className="w-full h-full text-black-primary-text" />
          </Broadcast.PictureInPictureTrigger>

          <Broadcast.FullscreenTrigger className="w-7 h-7 hover:scale-110 text-black-primary-text transition-all flex-shrink-0">
            <Broadcast.FullscreenIndicator asChild>
              <ExitFullscreenIcon className="w-full h-full text-black-primary-text" />
            </Broadcast.FullscreenIndicator>

            <Broadcast.FullscreenIndicator matcher={false} asChild>
              <EnterFullscreenIcon className="w-full h-full text-black-primary-text" />
            </Broadcast.FullscreenIndicator>
          </Broadcast.FullscreenTrigger>
        </div>
      </div>
    </Broadcast.Controls>
  );
};
