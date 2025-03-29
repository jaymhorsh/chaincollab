'use client';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import image from '@/assets/image1.png';
import { usePrivy } from '@privy-io/react-auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAllStreams } from '@/features/streamAPI';
import { Stream } from '@/interfaces';
// import { Stream } from "@/interfaces"

const Donations = () => {
  const { user } = usePrivy();
  const dispatch = useDispatch<AppDispatch>();
  const { streams, loading: streamsLoading } = useSelector((state: RootState) => state.streams);
  const [values, setValues] = useState(['1', '5', '10', '20']);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    dispatch(getAllStreams());
  }, [dispatch]);

  const filteredStreams = useMemo(() => {
    return streams.filter((stream: Stream) => !!stream.playbackId && stream.creatorId?.value === user?.wallet?.address);
  }, [streams, user?.wallet?.address]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the values to your backend
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Select Channel</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center border rounded-lg overflow-hidden flex-grow max-w-md">
            <div className="flex items-center px-3 py-2 w-full">
              <div className=" bg-gray-200 rounded overflow-hidden mr-2 flex-shrink-0">
                <Image
                  src={image}
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
                  <option key={stream.id} value={stream.name}>
                    {stream.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex bg-gray-100 rounded-lg overflow-hidden">
            <button
              className={`px-6 py-2 transition-colors ${isEnabled ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={isEnabled ? undefined : toggleEnabled}
            >
              Enabled
            </button>
            <button
              className={`px-6 py-2 transition-colors ${!isEnabled ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              onClick={isEnabled ? toggleEnabled : undefined}
            >
              Disable
            </button>
          </div>
        </div>
      </div>
      {/* Configure Donations Section */}
      <h2 className="text-xl font-semibold mb-4">Configure your donation and tip options</h2>
      <p className="text-base text-black mb-4">
        {selectedStream
          ? `Configuring donations for ${selectedStream}`
          : 'Please select a channel to configure donations'}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Preset Donation Amount</h3>
          {!isEditing && (
            <button
              onClick={toggleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={!selectedStream}
            >
              Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {values.map((value, index) => (
            <input
              key={index}
              type="number"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => handleChange(index, e)}
              disabled={!isEditing || !selectedStream}
              min="0"
              placeholder={`Amount ${index + 1}`}
            />
          ))}
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donations;
