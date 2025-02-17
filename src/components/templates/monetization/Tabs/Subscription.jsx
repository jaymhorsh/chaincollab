import React, { useState } from 'react';
import stream from '../../../../assets/image1.png';
const Subscription = () => {
  const [subscriptionType, setSubscriptionType] = useState('monthly');

  const [price, setPrice] = useState(4.99);
  const [perks, setPerks] = useState(['Ad-free viewing experience across all streams']);
  const [newPerk, setNewPerk] = useState('');

  const handleAddPerk = () => {
    if (newPerk.trim()) {
      setPerks([...perks, newPerk]);
      setNewPerk('');
    }
  };

  const handleRemovePerk = (index) => {
    setPerks(perks.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
      {
        /* /* Channel Selection */
        <div className="mb-4">
          <label className="block text-gray-700 text-base font-semibold mb-2">Select Channel</label>
          <div className="flex items-center gap-4">
            <select className="border rounded-lg px-3 py-2 w-1/2">
              <option>📺 D4 LAV Friday Night Vibes</option>
            </select>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                  <span className="absolute left-1 text-xs text-gray-700 peer-checked:left-6 peer-checked:text-white">
                    Enable
                  </span>
                  <span className="absolute right-1 text-xs text-gray-700 peer-checked:right-6 peer-checked:text-white">
                    Disable
                  </span>
                </div>
              </label>
            </div>
          </div>
          #
        </div>

        /* Subscription Type */
      }
      <div className=" p-4 rounded-lg shadow-lg w-full  md:w-1/2 border-2  border-[#DFE0E1]">
        <h2 className="text-lg font-semibold mb-3">Subscription</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Subscription Type</label>
          <div className="flex space-x-2">
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
              onChange={(e) => setPrice(e.target.value)}
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
      </div>
    </div>
  );
};

export default Subscription;
