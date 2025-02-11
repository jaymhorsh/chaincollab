import React from 'react';
import { useState } from 'react';
const Donations = () => {
  const [values, setValues] = useState(Array(4).fill(''));
  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  return (
    <div className="">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Select Channel</label>
        <div className="flex items-center gap-4">
          <select className="border border-[#DFE0E1] rounded-lg px-3 p-4 w-1/2">
            <option>📺 D4 LAV Friday Night Vibes</option>
          </select>
          <div className="border-2 border-[#DFE0E1] bg-gray-200  px-3 py- flex rounded-md">
            <button className="bg-blue-600 m-[10px] text-white px-4 py-2 rounded-lg">Enabled</button>
            <button className="m-[10px] text-gray-600 px-4 py-2 rounded-lg">Disable</button>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-xl">Configure your donation and tip options</h3>
      <div className="mt-4 shadow-lg p-6 rounded-lg bg-white w-full md:w-[805px] w">
        <div className="flex justify-between">
          <h3 className="font-semibold text-xl">Present Donation Amount</h3>
          <button className="bg-blue-500 p-[7px] w-[140px] rounded-md">Edit</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <input
              key={index}
              type="number"
              className="w-full outline-none ml-2 border p-2 rounded-md"
              value={values[index]}
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
        <div className="flex justify-end items-center mt-4">
          <button className="bg-blue-500 p-[7px] w-[140px] rounded-md">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Donations;
