import React, { useEffect, useMemo, useState } from 'react';
import { getAllStreams } from '@/features/streamAPI';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';

const Subscription = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [subscriptionType, setSubscriptionType] = useState('monthly');
  const [price, setPrice] = useState<number | undefined>();
  const [perks, setPerks] = useState(['Ad-free viewing experience across all streams']);
  const [newPerk, setNewPerk] = useState('');

  const handleAddPerk = () => {
    if (newPerk.trim()) {
      setPerks([...perks, newPerk]);
      setNewPerk('');
    }
  };

  const handleRemovePerk = (index: number): void => {
    setPerks(perks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
      {/* <div className="mb-4">
        <label className="block text-black text-base font-semibold mb-2">Select Channel</label>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center border rounded-lg overflow-hidden flex-grow max-w-md">
            <div className="flex items-center px-3 py-2 w-full">
              <div className=" bg-gray-200 rounded overflow-hidden mr-2 flex-shrink-0">
                <Image src={image} alt="Channel icon" width={60} height={40} className="object-cover w-full h-full" />
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
      </div> */}

      <div className=" p-4 rounded-lg shadow-lg w-full border-2  border-[#DFE0E1]">
        <h2 className="text-lg text-black font-semibold mb-3">Subscription</h2>

        <div className="mb-4">
          <label className="block text-[#0E0E0F] text-sm font-semibold mb-2">Subscription Type</label>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg ${subscriptionType === 'free' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSubscriptionType('free')}
            >
              Free
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                subscriptionType === 'monthly' ? 'bg-black text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSubscriptionType('monthly')}
            >
              Monthly Subscription
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                subscriptionType === 'one-time' ? 'bg-black text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSubscriptionType('one-time')}
            >
              One Time Access Payment
            </button>
          </div>
        </div>

        {/* Price Input */}
        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Price (USD)</label>
          <div className="flex items-center border-2 border-[#DFE0E1]  rounded-lg px-3 py-2">
            <span className="text-lg">$</span>
            <input
              type="number"
              className="w-full outline-none ml-2"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Perks Section */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Perks</label>
          {perks.map((perk, index) => (
            <div key={index} className="flex items-center bg-gray-200 px-3 py-2 rounded-lg mb-2">
              <span className="flex-1">{perk}</span>
              <button className="text-gray-600" onClick={() => handleRemovePerk(index)}>
                🗑️
              </button>
            </div>
          ))}
          <div className="flex items-center border-2 border-black rounded-lg px-3 py-2 mt-2">
            <input
              type="text"
              placeholder="Add perk description"
              className="w-full outline-none"
              value={newPerk}
              onChange={(e) => setNewPerk(e.target.value)}
            />
          </div>
          <button className="bg-gray-200 px-4 py-2 rounded-lg mt-2" onClick={handleAddPerk}>
            Add Perk
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x- 2 mt-4">
        <button className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
        <button className="bg-main-blue text-white px-4 py-2 rounded-lg">Save</button>
      </div>
    </div>
  );
};

export default Subscription;
