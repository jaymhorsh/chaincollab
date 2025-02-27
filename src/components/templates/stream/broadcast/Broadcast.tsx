'use client';
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
} from '@livepeer/react/assets';
import * as Broadcast from '@livepeer/react/broadcast';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { getIngest } from '@livepeer/react/external';
import { toast } from 'sonner';
import { Settings } from './Settings';
import styles from './BroadcastScroll.module.css';
import { useEffect, useState } from 'react';
import { RiVideoAddLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CustomizeChannelDialog } from '@/components/Dialog'; // our customized dialog
import Image from 'next/image';

interface Streams {
  streamKey: string;
  playbackId: string;
  streamName: string;
  isActive?: boolean;
  createdAt?: string;
}

export function BroadcastWithControls({ streamName, streamKey, playbackId }: Streams) {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const playbackUrl =
    host && playbackId
      ? `${host.includes('localhost') ? 'http' : 'https'}://${host}/view/${playbackId}`
      : null;
  const router = useRouter();

  // Load customization settings from localStorage or use defaults
  const [customization, setCustomization] = useState({
    bgColor: '#ffffff',
    fontSize: '16',
    textColor: '#000000',
    logo: '',
    title: streamName,
    description: '',

  });

  useEffect(() => {
    const stored = localStorage.getItem('channelCustomization');
    if (stored) {
      setCustomization(JSON.parse(stored));
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      if (playbackUrl) {
        await navigator.clipboard.writeText(playbackUrl);
        toast.success('Stream link successfully copied!');
      } else {
        toast.error('No playback URL available to copy.');
      }
    } catch (err) {
      toast.error('Failed to copy the stream link.');
    }
  };

  return (
    <Broadcast.Root
      onError={(error) =>
        error?.type === 'permissions'
          ? toast.error('You must accept permissions to broadcast. Please try again.')
          : null
      }
      aspectRatio={16 / 9}
      ingestUrl={getIngest(streamKey)}
    >
      {/* Wrap the broadcast container with the custom styles */}
      <div
        style={{
          backgroundColor: customization.bgColor,
          color: customization.textColor,
          fontSize: customization.fontSize + 'px',
        }}
        className="h-screen w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-3 w-full border-b border-green-400 h-[60px] bg-white">
        <BroadcastLoadingIndicator />
          <div className="flex items-center gap-x-3">
            <button
              className="rounded-md bg-background-gray px-4 py-2 hover:bg-gray-200 transition-colors"
              onClick={() => router.push('/dashboard')}
            >
              Change Channel
            </button>
           
            <div className='px-10'>
              <CustomizeChannelDialog
  initialValues={customization}
  onSave={(newSettings) =>
    setCustomization({ ...newSettings, logo: newSettings.logo ?? '' })
  }
/>
            </div>
            <div>
              <Image src={customization.logo} alt='logo' width={80} height={80}/>
            </div>
          </div>
          <div style={{
          fontSize: customization.fontSize, color: customization.textColor}} className="flex items-center gap-x-3 mt-2 sm:mt-0">
            <button className="rounded-md bg-background-gray py-1 min-w-[100px] pl-3 flex flex-col">
              <span className="font-medium">00:00:00</span>
              <span className="">Session</span>
            </button>
            <button className={`rounded-md bg-background-gray py-1 min-w-[100px] pl-3 flex flex-col`}>
              <span className=" font-medium">0</span>
              <span className="">Followers</span>
            </button>
            <button className="rounded-md bg-background-gray py-1 min-w-[100px] pl-3 flex flex-col">
              <span className="font-medium">0</span>
              <span className="">Viewers</span>
            </button>
          </div>
          <div className="mt-2 sm:mt-0">
            <BroadcastTrigger />
          </div>
        </div>
        {/* Body */}
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-12 gap-x-2 pt-1 overflow-hidden">
          {/* Streaming Section */}
          <section className={`col-span-12 md:col-span-8 overflow-y-auto ${styles.customScrollbar} mb-[63px]`}>
            <div className="w-full border-l border-border-gray bg-background-gray h-full">
              <BroadcastContainer />
              <div className="w-full">
                {/* Copy & Visit Link */}
                <div style={
                  {backgroundColor: customization.bgColor}  
                } className="w-full p-3 border border-border-gray rounded-b-md " >
                  <div className="flex w-full justify-between items-center gap-x-3">
                    <div className="flex items-center gap-x-3">
                      <button className="flex rounded-sm bg-background-gray h-[33px] items-center px-3">
                        <span className=" text-black-primary-text font-medium select-none">
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
                        <span className=" text-black-secondary-text font-medium select-none">
                          Copy Link
                        </span>
                      </button>
                      {playbackUrl && (
                        <Link href={playbackUrl} target="_blank" rel="noopener noreferrer">
                          <button className="flex rounded-md bg-background-gray h-[33px] items-center px-3">
                            <span className=" text-black-secondary-text font-medium select-none">
                              Visit Link
                            </span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                {/* Basics Info */}
                <div  style={{
          backgroundColor: customization.bgColor}} className="w-full border border-border-gray mt-2 rounded-t-md h-full">
                  <div className="flex items-center gap-x-3 px-4 p-2 rounded-md">
                    <h1 className=" font-bold text-black-primary-text select-none">Basics</h1>
                    <button className="flex rounded-md bg-background-gray h-[33px] items-center px-4">
                      <span className=" text-black-secondary-text font-medium select-none">
                        Edit
                      </span>
                    </button>
                  </div>
                  <div className="w-full p-3 pl-4 rounded-b-md bg-white border-t text-justify">
                    <div className="flex flex-col mb-3 gap-y-2">
                      <h1 className=" text-black-secondary-text font-medium select-none">
                        Title
                      </h1>
                      <input
                        value={streamName}
                        disabled
                        className="w-full text-sm outline-none border bg-transparent p-3 text-black-secondary-text border-[#c2c2c2] rounded-md font-medium select-none"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h1 className=" text-black-secondary-text font-medium select-none">
                        Description
                      </h1>
                      <textarea
                        value={''}
                        disabled
                        rows={3}
                        className="w-full text-sm outline-none border bg-transparent line-clamp-4 p-3 text-black-secondary-text border-[#c2c2c2] rounded-md font-medium select-none overflow-y-auto"
                      />
                    </div>
                  </div>
                </div>
                {/* Ads Section */}
                <div style={{
          backgroundColor: customization.bgColor}}  className="w-full border border-border-gray rounded-t-md ">
                  <div className="flex items-center gap-x-3 p-2 px-4 rounded-md">
                    <h1 className=" text-black-primary-text font-bold select-none">
                      Ads
                    </h1>
                    <button className="flex rounded-md bg-background-gray h-[33px] items-center px-4">
                      <span className=" text-black-secondary-text font-medium select-none">
                        Edit
                      </span>
                    </button>
                    <button className="flex rounded-md bg-background-gray h-[33px] items-center ml-auto px-4">
                      <span className="text-xs text-black-secondary-text font-medium select-none">
                        Preset
                      </span>
                    </button>
                  </div>
                  <div className="w-full rounded-b-md p-4 bg-white border-t text-justify">
                    <h1 className="text-black-secondary-text font-medium">Video</h1>
                    {/* Video Ads content */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Chat Section */}
          <section className={`col-span-12 md:col-span-4 mb-[63px] ${styles.customScrollbar}`}>
            <div className="w-full border-2 rounded-md bg-background-gray border-border-gray h-full flex flex-col">
              <div style={{
          backgroundColor: customization.bgColor}}  className="flex  items-center w-full">
                <h1 className="text-base px-4 py-3 rounded-md text-black-primary-text font-medium select-none">
                  Chat
                </h1>
              </div>
              {/* Chat content */}
            </div>
          </section>
        </div>
      </div>
    </Broadcast.Root>
  );
}

export const BroadcastContainer = () => {
  return (
    <Broadcast.Container className="flex relative">

      {/* <div>
        <BroadcastLoadingIndicator />
        </div> */}
      <Broadcast.Video
        title="Live streaming"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
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
        className="absolute select-none inset-0 text-center flex flex-col items-center justify-center gap-4 duration-1000 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
      >
        <OfflineErrorIcon className="h-[120px] w-full sm:flex hidden" />
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">Broadcast failed</div>
          <div className="text-sm text-gray-100">
            There was an error with broadcasting - it is retrying in the background.
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
      <Broadcast.EnabledTrigger className="rounded-md">
        <Broadcast.EnabledIndicator
          className="flex items-center bg-main-blue h-[40px] min-w-[150px] rounded-md text-black-primary-text px-4 justify-center"
          matcher={false}
        >
          <span className="text-base text-black font-medium">Start Stream</span>
        </Broadcast.EnabledIndicator>
        {/* End Stream Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Broadcast.EnabledIndicator
              className="flex items-center justify-center bg-red-500 h-[40px] w-full min-w-[150px] rounded-md text-black-primary-text px-4 cursor-pointer"
              matcher={true}
            >
              <span className="text-base text-black  font-medium">
                End Stream
              </span>
            </Broadcast.EnabledIndicator>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="p-6 flex flex-col w-[292px] items-center rounded-md mr-2 z-10 bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              sideOffset={5}
            >
              <p className="text-black font-medium text-base mb-4 text-center">
                Are you sure you want to end this Stream?
              </p>
              <div className="flex gap-x-4">
                <DropdownMenu.Item
                  className="flex items-center cursor-pointer px-6 py-3 border h-[40px] rounded-md text-black justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-black font-medium text-sm">Cancel</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center cursor-pointer px-6 py-3 bg-red-500 h-[40px] rounded-md text-black justify-center">
                  <p className="text-black font-medium text-sm">End Stream</p>
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
      <div className="overflow-hidden h-[34px] rounded-md  top-1 left-1 bg-gray-200 flex items-center backdrop-blur">
        <Broadcast.StatusIndicator matcher="live" className="flex p-2 gap-2 items-center">
          <div className="bg-[#04EB2A] h-3 w-3 rounded-full" />
          <span className="text-sm text-black-primary-text font-medium select-none">Live</span>
        </Broadcast.StatusIndicator>
        <Broadcast.StatusIndicator className="flex p-2 gap-2 items-center" matcher="pending">
          <div className="bg-[#DC7609] h-3 w-3 rounded-full animate-pulse" />
          <span className="text-sm text-black-primary-text font-medium select-none">Pending</span>
        </Broadcast.StatusIndicator>
        <Broadcast.StatusIndicator className="flex p-2 gap-2 items-center" matcher="idle">
          <div className="bg-[#00000033] animate-pulse h-3 w-3 rounded-full" />
          <span className="text-sm text-black-primary-text font-medium select-none">Offline</span>
        </Broadcast.StatusIndicator>
      </div>
    </Broadcast.LoadingIndicator>
  );
};

export const BroadcastControls = () => {
  return (
    <Broadcast.Controls autoHide={2000} className="flex flex-col-reverse mb-2 px-5 rounded-md">
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
