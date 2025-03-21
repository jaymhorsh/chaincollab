'use client';
import React, { useEffect, useState } from 'react';
import * as Player from '@livepeer/react/player';
import type { Src } from '@livepeer/react';
import {
  EnterFullscreenIcon,
  ExitFullscreenIcon,
  LoadingIcon,
  MuteIcon,
  OfflineErrorIcon,
  PauseIcon,
  PictureInPictureIcon,
  PlayIcon,
  PrivateErrorIcon,
  UnmuteIcon,
} from '@livepeer/react/assets';
import { Clip } from './Clip';
import { Settings } from './Settings';
import { useViewMetrics } from '@/app/hook/useViewerMetrics';
import { Smile, Gift } from 'lucide-react';

export function PlayerWithControls({ src, title, playbackId }: { src: Src[]; title: string; playbackId: string }) {
  const [customization, setCustomization] = useState({
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16',
  });
  const { viewerMetrics: totalViewers } = useViewMetrics({ playbackId });
  useEffect(() => {
    const stored = localStorage.getItem('channelCustomization');
    if (stored) {
      setCustomization(JSON.parse(stored));
    }
  }, []);

  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const playbackUrl =
    host && playbackId
      ? `${host.includes('localhost') ? 'http' : 'https'}://${host}/view/${playbackId}?streamName=${encodeURIComponent(
          title,
        )}`
      : null;

  return (
    <div
      className="min-h-screen w-full bg-white"
      style={{
        backgroundColor: customization.bgColor,
        color: customization.textColor,
        fontSize: `${customization.fontSize}px`,
      }}
    >
      <div className="container mx-auto px-4 py-6 ">
        {/* Title */}
        <div className="mt-6 text-center text-xl font-semibold capitalize">{title}</div>

        {/* Main Content Area */}
        {/* <div className="w-full h-screen grid grid-cols-1 md:grid-cols-12 gap-2 pt-1 mt-6 overflow-hidden pb-6">   */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Player Section */}
          <div className="flex-1 flex md:col-span-8 flex-col">
            <Player.Root autoPlay clipLength={30} src={src}>
              <Player.Container className="relative h-full w-full overflow-hidden rounded-md bg-gray-950 outline outline-1 outline-white/50 data-[playing=true]:outline-white/80 data-[playing=true]:outline-2 data-[fullscreen=true]:outline-none data-[fullscreen=true]:rounded-none transition-all">
                <Player.Video title="Live stream" className="h-[590px] w-full object-cover" />

                {/* Loading Indicator */}
                <Player.LoadingIndicator className="absolute inset-0 bg-black/50 backdrop-blur data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0">
                  <div className="flex h-full w-full items-center justify-center">
                    <LoadingIcon className="h-8 w-8 animate-spin text-white" />
                  </div>
                </Player.LoadingIndicator>

                {/* Generic Error Indicator */}
                <Player.ErrorIndicator
                  matcher="all"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 text-center backdrop-blur-lg data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
                >
                  <div className="flex items-center justify-center">
                    <LoadingIcon className="h-8 w-8 animate-spin text-white" />
                  </div>
                  <p className="text-white">An error occurred</p>
                </Player.ErrorIndicator>

                {/* Offline Indicator */}
                <Player.ErrorIndicator
                  matcher="offline"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 text-center backdrop-blur-lg data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
                >
                  <OfflineErrorIcon className="hidden h-[120px] w-full sm:flex" />
                  <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold text-white">Stream is offline</div>
                    <div className="text-sm text-gray-100">
                      Playback will start automatically once the stream has started
                    </div>
                  </div>
                </Player.ErrorIndicator>

                {/* Access Control / Private Stream Indicator */}
                <Player.ErrorIndicator
                  matcher="access-control"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 text-center backdrop-blur-lg data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
                >
                  <PrivateErrorIcon className="hidden h-[120px] w-full sm:flex" />
                  <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold text-white">Stream is private</div>
                    <div className="text-sm text-gray-100">
                      It looks like you don&apos;t have permission to view this content
                    </div>
                  </div>
                </Player.ErrorIndicator>

                {/* Player Controls */}
                <Player.Controls
                  autoHide={1000}
                  className="bg-gradient-to-b gap-1 px-3 md:px-3 py-2 flex-col-reverse flex from-black/20 via-80% via-black/30 duration-1000 to-black/60 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-1 items-center gap-3">
                      <Player.PlayPauseTrigger className="w-6 h-6 hover:scale-110 transition-all flex-shrink-0">
                        <Player.PlayingIndicator asChild matcher={false}>
                          <PlayIcon className="w-full h-full" />
                        </Player.PlayingIndicator>
                        <Player.PlayingIndicator asChild>
                          <PauseIcon className="w-full h-full text-white" />
                        </Player.PlayingIndicator>
                      </Player.PlayPauseTrigger>

                      <Player.LiveIndicator className="gap-2  flex items-center">
                        <div className="bg-red-600 h-1.5 w-1.5 rounded-full" />
                        <span className="text-sm text-white select-none">LIVE</span>
                      </Player.LiveIndicator>
                      <Player.LiveIndicator matcher={false} className="flex gap-2 items-center">
                        <Player.Time className="text-sm tabular-nums select-none text-white" />
                      </Player.LiveIndicator>
                      <Player.MuteTrigger className="w-6 h-6 hover:scale-110 transition-all flex-shrink-0">
                        <Player.VolumeIndicator asChild matcher={false}>
                          <MuteIcon className="w-full text-white h-full" />
                        </Player.VolumeIndicator>
                        <Player.VolumeIndicator asChild matcher={true}>
                          <UnmuteIcon className="w-full text-white h-full" />
                        </Player.VolumeIndicator>
                      </Player.MuteTrigger>
                      <Player.Volume className="relative mr-1 flex-1 group flex cursor-pointer items-center select-none touch-none max-w-[120px] h-5">
                        <Player.Track className="bg-white/30 relative grow rounded-full transition-all h-[2px] md:h-[3px] group-hover:h-[3px] group-hover:md:h-[4px]">
                          <Player.Range className="absolute bg-white rounded-full h-full" />
                        </Player.Track>
                        <Player.Thumb className="block transition-all group-hover:scale-110 w-3 h-3 bg-white rounded-full" />
                      </Player.Volume>
                    </div>
                    <div className="flex sm:flex-1 md:flex-[1.5] justify-end items-center gap-2.5">
                      <Player.FullscreenIndicator matcher={false} asChild>
                        <Settings className="w-6 h-6 transition-all text-white flex-shrink-0" />
                      </Player.FullscreenIndicator>
                      <Clip className="flex items-center text-white w-6 h-6 justify-center" />

                      <Player.PictureInPictureTrigger className="w-6 h-6 hover:scale-110 transition-all flex-shrink-0">
                        <PictureInPictureIcon className="w-full h-full text-white" />
                      </Player.PictureInPictureTrigger>

                      <Player.FullscreenTrigger className="w-6 h-6 hover:scale-110 transition-all flex-shrink-0">
                        <Player.FullscreenIndicator asChild>
                          <ExitFullscreenIcon className="w-full h-full text-white" />
                        </Player.FullscreenIndicator>

                        <Player.FullscreenIndicator matcher={false} asChild>
                          <EnterFullscreenIcon className="w-full h-full text-white" />
                        </Player.FullscreenIndicator>
                      </Player.FullscreenTrigger>
                    </div>
                  </div>
                  <Player.Seek className="relative group flex cursor-pointer items-center select-none touch-none w-full h-5">
                    <Player.Track className="bg-white/30 relative grow rounded-full transition-all h-[2px] md:h-[3px] group-hover:h-[3px] group-hover:md:h-[4px]">
                      <Player.SeekBuffer className="absolute bg-black/30 transition-all duration-1000 rounded-full h-full" />
                      <Player.Range className="absolute bg-white rounded-full h-full" />
                    </Player.Track>
                    <Player.Thumb className="block group-hover:scale-110 w-3 h-3 bg-white transition-all rounded-full" />
                  </Player.Seek>
                </Player.Controls>
              </Player.Container>
            </Player.Root>

            {/* Title and Viewer Count below the Player */}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-2xl font-semibold text-black">{title}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M1.13465 18.3333C0.874752 18.3333 0.662336 18.1219 0.680419 17.8626C0.921899 14.4003 3.80706 11.6666 7.33073 11.6666C10.9732 11.6666 13.9334 14.5877 13.9964 18.2152C13.9975 18.2801 13.9447 18.3333 13.8797 18.3333H1.13465ZM7.33073 10.8333C4.56823 10.8333 2.33073 8.59575 2.33073 5.83325C2.33073 3.07075 4.56823 0.833252 7.33073 0.833252C10.0932 0.833252 12.3307 3.07075 12.3307 5.83325C12.3307 8.59575 10.0932 10.8333 7.33073 10.8333ZM13.7277 12.9922C13.6526 12.9024 13.7358 12.7685 13.8472 12.8046C16.0719 13.5275 17.7493 15.4644 18.0974 17.8336C18.1369 18.1027 17.9199 18.3333 17.6478 18.3333H15.7817C15.7167 18.3333 15.6641 18.2804 15.6632 18.2155C15.6357 16.229 14.9131 14.4105 13.7277 12.9922ZM12.0353 10.8229C11.9351 10.8159 11.8957 10.6928 11.968 10.6229C13.2194 9.41095 13.9974 7.71297 13.9974 5.83325C13.9974 4.74321 13.7358 3.71428 13.2719 2.80581C13.2263 2.71635 13.3033 2.61265 13.4004 2.63835C15.1837 3.11026 16.4974 4.73431 16.4974 6.66659C16.4974 8.96867 14.6328 10.8333 12.3307 10.8333C12.2314 10.8333 12.1329 10.8298 12.0353 10.8229Z"
                    fill="black"
                  />
                </svg>

                <span className="text-black">
                  {totalViewers?.viewCount} {totalViewers?.viewCount === 0 ? 'viewer' : 'viewers'}
                </span>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              <p className="text-sm text-[#53525F] capitalize">{`Join ${title} > ${playbackUrl}`}</p>
              <p className="text-sm text-[#53525F]">
                {title} is a thriving web3 community at the intersection of decentralization and innovation. We believe
                in the power of global collaboration to shape the future of blockchain. Whether you&apos;re a founder,
                investor, or builder, WAGMI DAO provides the platform to connect, learn, and grow within a vibrant
                decentralized ecosystem.
              </p>
            </div>
          </div>
          {/* Chat Section */}
          <div className="lg:col-span-4">
            <div className="border rounded-lg h-full flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Chat</h3>
              </div>

              {/* Chat messages area */}
              <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[500px] flex items-center justify-center text-gray-500">
                <p>Welcome to the chat!</p>
              </div>

              {/* Message input */}
              <div className="border-t p-3">
                <form className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Send message..."
                      className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                      // onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="button" className="text-gray-500 hover:text-gray-700">
                      <Smile size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <button type="button" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                      <Gift size={18} />
                      <span>Gift</span>
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Chat
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal loading UI that appears before or during buffering.
 */
export const PlayerLoading = ({ children }: { children?: React.ReactNode }) => (
  <div className="relative mx-auto flex max-w-2xl flex-col-reverse gap-3 overflow-hidden rounded-sm bg-white/70 px-3 py-2 animate-pulse">
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 animate-pulse rounded-lg bg-white/5" />
        <div className="h-6 w-16 animate-pulse rounded-lg bg-white/5 md:h-7 md:w-20" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 animate-pulse rounded-lg bg-white/5" />
        <div className="h-6 w-6 animate-pulse rounded-lg bg-white/5" />
      </div>
    </div>
    <div className="h-2 w-full animate-pulse rounded-lg bg-white/5" />
    {children}
  </div>
);
