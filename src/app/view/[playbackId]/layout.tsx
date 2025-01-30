'use client';
import type { ReactNode } from 'react';
export default function PlayerLayout({ children, params }: { children: ReactNode; params: { playbackId: string } }) {
  return (
    <main className="grid grid-cols-12 relative min-h-screen gap-2 bg-black h-full ">
      <div className="col-span-9 flex flex-col items-center justify-center gap-6 py-12 md:py-8 p-4 bg-background-gray rounded-lg shadow-lg">
        <div className="flex gap-2 max-w-lg text-center flex-col">
          <span className="text-3xl font-semibold text-black-primary-text">Welcome to </span>
          <span className="text-lg text-black-secondary-text">
            Enjoy watching and interacting with the . We hope you have a great time!
          </span>
        </div>
        <span className="h-px w-full max-w-md bg-gradient-to-r from-white/5 via-white/60 to-white/5" />
        {children}
      </div>
      <div className="col-span-3 flex items-center justify-center h-full">
        <div className="w-full border-2 bg-white rounded-md border-border-gray h-full flex flex-col shadow-md">
          <div className="flex bg-background-gray items-center w-full rounded-t-md">
            <h1 className="text-base px-4 py-3 rounded-md text-black-primary-text font-medium select-none">Chat</h1>
          </div>
          {/* <ChatContextProvider>
            <Chat playbackId={params.playbackId} />
          </ChatContextProvider> */}
        </div>
      </div>
    </main>
  );
}
