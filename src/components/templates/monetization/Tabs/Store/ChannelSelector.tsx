'use client';
import Image from 'next/image';
import image from '@/assets/image1.png';

interface ChannelSelectorProps {
  selectedStream: string;
  setSelectedStream: (streamId: string) => void;
  filteredStreams: any[];
  streamsLoading: boolean;
  isEnabled: boolean;
  toggleEnabled: () => void;
}

export const ChannelSelector = ({
  selectedStream,
  setSelectedStream,
  filteredStreams,
  streamsLoading,
  isEnabled,
  toggleEnabled,
}: ChannelSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Select Channel</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center border rounded-lg overflow-hidden flex-grow max-w-md">
          <div className="flex items-center px-3 py-2 w-full">
            <div className=" bg-gray-200 rounded overflow-hidden mr-2 flex-shrink-0">
              <Image
                src={image || '/placeholder.svg'}
                alt="Channel icon"
                width={60}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <select
              className="bg-transparent border-none focus:outline-none w-full"
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              disabled={streamsLoading}
            >
              <option value="">Select a channel</option>
              {filteredStreams.map((stream: any) => (
                <option key={stream.id} value={stream.id}>
                  {stream.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`px-6 py-2 transition-colors ${isEnabled ? 'bg-main-blue text-white' : 'text-gray-600'}`}
            onClick={isEnabled ? undefined : toggleEnabled}
          >
            Enabled
          </button>
          <button
            className={`px-6 py-2 transition-colors ${!isEnabled ? 'bg-main-blue text-white' : 'text-gray-600'}`}
            onClick={isEnabled ? toggleEnabled : undefined}
          >
            Disable
          </button>
        </div>
      </div>
    </div>
  );
};
