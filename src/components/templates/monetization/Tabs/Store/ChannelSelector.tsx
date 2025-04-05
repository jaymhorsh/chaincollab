"use client"

import Image from "next/image"
import { useState } from "react"
import image from "@/assets/image1.png"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Channel {
  id: string
  name: string
  playbackId?: string
  creatorId?: {
    value: string
  }
  // Add any other channel properties here
}

interface ChannelSelectorProps {
  filteredStreams: Channel[]
  streamsLoading: boolean
}

export const ChannelSelector = ({ filteredStreams, streamsLoading }: ChannelSelectorProps) => {
  // Track enabled state for each channel by ID
  const [enabledChannels, setEnabledChannels] = useState<Record<string, boolean>>(() => {
    // Initialize all channels as disabled by default
    const initialState: Record<string, boolean> = {}
    filteredStreams.forEach((stream) => {
      initialState[stream.id] = false
    })
    return initialState
  })

  // Toggle a specific channel's enabled state
  const toggleChannel = (channelId: string) => {
    setEnabledChannels((prev) => ({
      ...prev,
      [channelId]: !prev[channelId],
    }))
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Select Channel</h2>

      {streamsLoading ? (
        <div className="p-4 text-center">Loading channels...</div>
      ) : filteredStreams.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No channels available</div>
      ) : (
        <Accordion type="single" collapsible className="w-full border rounded-lg">
          {filteredStreams.map((stream) => (
            <AccordionItem key={stream.id} value={stream.id}>
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex items-center w-full">
                  <div className="bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${stream.name} icon`}
                      width={60}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="flex-grow text-left">{stream.name}</span>
                  <div className="ml-auto flex items-center gap-2 mr-2">
                    <Label htmlFor={`channel-toggle-${stream.id}`} className="sr-only">
                      Toggle channel {stream.name}
                    </Label>
                    <Switch
                      id={`channel-toggle-${stream.id}`}
                      checked={enabledChannels[stream.id]}
                      onCheckedChange={() => toggleChannel(stream.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Toggle ${stream.name}`}
                    />
                    <span className="text-sm font-medium">{enabledChannels[stream.id] ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="space-y-2">
                  {/* <p className="text-sm text-gray-600">Channel ID: {stream.id}</p> */}
                  {stream.playbackId && <p className="text-sm text-gray-600">Playback ID: {stream.playbackId}</p>}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Status:</span>
                    <span
                      className={`text-sm font-medium ${enabledChannels[stream.id] ? "text-green-600" : "text-red-600"}`}
                    >
                      {enabledChannels[stream.id] ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}

