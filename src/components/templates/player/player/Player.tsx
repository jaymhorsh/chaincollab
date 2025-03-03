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

export function PlayerWithControls({ src, title, playbackId }: { src: Src[]; title: string; playbackId: string }) {
  const [customization, setCustomization] = useState({
    bgColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16',
  });

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
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundColor: customization.bgColor,
        color: customization.textColor,
        fontSize: `${customization.fontSize}px`,
      }}
    >
      {/* Title */}
      <div className="mt-6 text-center text-xl font-semibold">{title}</div>

      {/* Main Content Area */}
      <div className="flex-1 mt-6 flex flex-col md:flex-row gap-4 px-4 pb-6">
        {/* Player Section */}
        <div className="flex-1 flex flex-col">
          <Player.Root autoPlay clipLength={30} src={src}>
            <Player.Container className="relative h-[590px] w-full overflow-hidden rounded-md bg-gray-950 outline outline-1 outline-white/50 data-[playing=true]:outline-white/80 data-[playing=true]:outline-2 data-[fullscreen=true]:outline-none data-[fullscreen=true]:rounded-none transition-all">
              <Player.Video title="Live stream" className="h-full w-full object-cover" />

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
                autoHide={1500}
                className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 bg-gradient-to-b from-transparent to-black px-4 py-3 data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=false]:fade-out-0 data-[visible=true]:fade-in-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play / Pause */}
                    <Player.PlayPauseTrigger className="flex h-8 w-8 items-center justify-center transition-all hover:scale-110">
                      <Player.PlayingIndicator asChild matcher={false}>
                        <PlayIcon className="h-full w-full text-white" />
                      </Player.PlayingIndicator>
                      <Player.PlayingIndicator asChild matcher>
                        <PauseIcon className="h-full w-full text-white" />
                      </Player.PlayingIndicator>
                    </Player.PlayPauseTrigger>

                    {/* Mute / Unmute */}
                    <Player.MuteTrigger className="flex h-8 w-8 items-center justify-center transition-all hover:scale-110">
                      <Player.VolumeIndicator asChild matcher={false}>
                        <MuteIcon className="h-full w-full text-white" />
                      </Player.VolumeIndicator>
                      <Player.VolumeIndicator asChild matcher>
                        <UnmuteIcon className="h-full w-full text-white" />
                      </Player.VolumeIndicator>
                    </Player.MuteTrigger>

                    {/* Volume Slider (on medium+ screens) */}
                    <Player.Volume className="hidden w-32 items-center md:flex">
                      <Player.Track className="relative h-[2px] w-full rounded-full bg-white/30">
                        <Player.SeekBuffer className="absolute top-0 left-0 h-full bg-black/30" />
                        <Player.Range className="absolute top-0 left-0 h-full bg-white" />
                      </Player.Track>
                      <Player.Thumb className="block h-3 w-3 -translate-x-1/2 rounded-full bg-white" />
                    </Player.Volume>

                    {/* Live Indicator or Time */}
                    <div className="flex items-center gap-2 text-white">
                      <Player.LiveIndicator matcher className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-600" />
                        <span className="text-sm">LIVE</span>
                      </Player.LiveIndicator>
                      <Player.LiveIndicator matcher={false}>
                        <Player.Time className="text-sm" />
                      </Player.LiveIndicator>
                    </div>
                  </div>

                  {/* Extra Controls (Clip, PiP, Fullscreen) */}
                  <div className="flex items-center gap-3">
                    <Clip className="h-6 w-6 text-white" />
                    <Player.PictureInPictureTrigger className="h-6 w-6 text-white transition-all hover:scale-110">
                      <PictureInPictureIcon />
                    </Player.PictureInPictureTrigger>
                    <Player.FullscreenTrigger className="h-6 w-6 text-white transition-all hover:scale-110">
                      <Player.FullscreenIndicator asChild matcher>
                        <ExitFullscreenIcon />
                      </Player.FullscreenIndicator>
                      <Player.FullscreenIndicator asChild matcher={false}>
                        <EnterFullscreenIcon />
                      </Player.FullscreenIndicator>
                    </Player.FullscreenTrigger>
                  </div>
                </div>

                {/* Seek Bar */}
                <div className="flex w-full items-center">
                  <Player.Seek className="group relative flex-1 h-2 cursor-pointer">
                    <Player.Track className="relative h-[2px] w-full rounded-full bg-white/30">
                      <Player.SeekBuffer className="absolute top-0 left-0 h-full bg-black/30" />
                      <Player.Range className="absolute top-0 left-0 h-full bg-white" />
                    </Player.Track>
                    <Player.Thumb className="block h-3 w-3 -translate-x-1/2 rounded-full bg-white transition-all group-hover:scale-110" />
                  </Player.Seek>
                </div>
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
              <span className="text-black">1 viewers</span>
            </div>
          </div>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-[#53525F]">{`Join ${title} > ${playbackUrl}`}</p>
            <p className="text-sm text-[#53525F]">
              {title} is a thriving web3 community at the intersection of decentralization and innovation. We believe in
              the power of global collaboration to shape the future of blockchain. Whether you&apos;re a founder,
              investor, or builder, WAGMI DAO provides the platform to connect, learn, and grow within a vibrant
              decentralized ecosystem.
            </p>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex w-full flex-col md:w-[400px] rounded-md border pb-8 border-gray-300 bg-white">
          <h3 className=" bg-gray-200 p-4 text-lg font-semibold">Chat</h3>
          <div className="flex flex-1 flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-gray-500 text-center">Welcome to the chat!</p>
            </div>
            <div className="flex items-center gap-2  p-2">
              <input
                type="text"
                placeholder="Say something..."
                className="flex-1 rounded-md border placeholder:text-[#838294] border-[#0E0E0F] px-3 py-3"
              />
            </div>
            <div className="flex w-full justify-between p-2">
              <button className="rounded-md bg-[#EEEFF1] px-4 py-2 flex items-center justify-center gap-2 text-black hover:bg-gray-200">
                <span>
                  <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.0052 0.335205C11.478 0.335205 12.6719 1.52911 12.6719 3.00187C12.6719 3.48789 12.5418 3.94354 12.3147 4.33595L15.3386 4.3352V5.66853H14.0052V12.3352C14.0052 12.7034 13.7068 13.0019 13.3386 13.0019H2.67188C2.30369 13.0019 2.00521 12.7034 2.00521 12.3352V5.66853H0.671875V4.3352L3.69572 4.33595C3.46857 3.94354 3.33854 3.48789 3.33854 3.00187C3.33854 1.52911 4.53245 0.335205 6.00521 0.335205C6.80202 0.335205 7.51722 0.684678 8.00582 1.23871C8.49322 0.684678 9.20842 0.335205 10.0052 0.335205ZM8.67189 5.66853H7.33856V12.3352H8.67189V5.66853ZM6.00521 1.66854C5.26883 1.66854 4.67188 2.26549 4.67188 3.00187C4.67188 3.70478 5.2158 4.28065 5.9057 4.33155L6.00521 4.3352H7.33856V3.00187C7.33856 2.33411 6.84769 1.781 6.20706 1.68372L6.10472 1.67219L6.00521 1.66854ZM10.0052 1.66854C9.30229 1.66854 8.72642 2.21246 8.67556 2.90237L8.67189 3.00187V4.3352H10.0052C10.7081 4.3352 11.284 3.79129 11.3349 3.10138L11.3386 3.00187C11.3386 2.26549 10.7416 1.66854 10.0052 1.66854Z"
                      fill="#53525F"
                    />
                  </svg>
                </span>
                <span> Gift</span>
              </button>
              <button className="rounded-md bg-main-blue px-4 py-2 text-white hover:bg-blue-700">Send</button>
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
