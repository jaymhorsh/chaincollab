
'use client';

import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import image from '@/assets/image1.png';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Channel {
  id: string;
  name: string;
  playbackId?: string;
  creatorId?: {
    value: string;
  };
  // Other channel properties if needed
}

interface ChannelSelectorProps {
  filteredStreams: Channel[];
  streamsLoading: boolean;
}

export const ChannelSelector = ({ filteredStreams, streamsLoading }: ChannelSelectorProps) => {
  // Global switch state: true means channels are enabled (active), false means disabled (idle)
  const [globalEnabled, setGlobalEnabled] = useState<boolean>(true);
  const [isToggling, setIsToggling] = useState<boolean>(false);

  // When the global switch is toggled, send a request to update all streams.
  const handleGlobalToggle = async () => {
    // Calculate the new global state
    const newState = !globalEnabled;
    setIsToggling(true);
    try {
      // In this example, if newState === true we want streams enabled,
      // so we pass disable: false; if newState === false we pass disable: true.
      await axios.post('https://chaintv.onrender.com/api/vidoes/disable', {
        disable: !newState,
      });
      setGlobalEnabled(newState);
      toast.success(newState ? 'Enabled all streams' : 'Disabled all streams');
    } catch (error) {
      toast.error('Failed to update stream status');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Enable and Disable store</h2>

      {/* Global toggle switch for all channels */}
      <div className="flex items-center mb-4">
        <Label htmlFor="global-channel-toggle" className="mr-2">
          {globalEnabled ? 'Streams Enabled' : 'Streams Disabled'}
        </Label>
        <Switch
          id="global-channel-toggle"
          checked={globalEnabled}
          onCheckedChange={handleGlobalToggle}
          disabled={isToggling}
        />
      </div>

      {streamsLoading ? (
        <div className="p-4 text-center">Loading Assets...</div>
      ) : filteredStreams.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No available asset</div>
      ) : (
        <Accordion type="single"  className="w-full border rounded-lg">
          {filteredStreams.map((stream) => (
            <AccordionItem key={stream.id} value={stream.id}>
              <div className="px-4 py-2 hover:no-underline">
                <div className="flex items-center w-full relative">
                  <div className="bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${stream.name} icon`}
                      width={60}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="flex-grow text-left">{stream.name}</span>
                  {/* Global status indicator overlaid on the right side */}
                  <div className="ml-auto">
                    <div className="absolute top-2 right-2 px-2 py-1 rounded flex items-center gap-1">
                    <span
                      className={`text-sm font-medium ${globalEnabled ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {globalEnabled ? 'Active' : 'Inactive'}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
