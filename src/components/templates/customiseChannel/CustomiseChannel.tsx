'use client';
import React, { useState } from 'react';
import Header from '@/components/templates/customiseChannel/Header';
import SkeletonLoader from '@/components/ui/skeleton';
import Image from 'next/image';

const CustomiseChannel = () => {
  const [selectedBackground, setSelectedBackground] = useState('#ffffff');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brandName, setBrandName] = useState('WAGMI DAO');
  const [useLogo, setUseLogo] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedTextColor, setSelectedTextColor] = useState('#000000'); // New state for text color

  const colors = [
    '#000000',
    '#ffffff',
    '#ff0000',
    '#ff9900',
    '#ffff00',
    '#00ff00',
    '#0000ff',
    '#6600ff',
    '#ff00ff',
    '#00ffff',
    '#800000',
    '#808000',
    '#008080',
    '#800080',
  ];

  // Function to handle saving selections
  const handleSave = () => {
    const channelData = {
      title,
      description,
      brandName,
      useLogo,
      logo,
      selectedBackground,
      selectedTextColor,
    };
    alert(JSON.stringify(channelData, null, 2));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-6">
        {/* Title & Description Input */}
        <div className="bg-white p-6 rounded-lg border border-[#DFE0E1] shadow-md mx-auto ">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <label className="block mb-2 font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md mb-3"
          />
          <label className="block mb-2 font-medium text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Branding Section */}
        <div className="mt-8 mx-auto">
          <h1 className="text-xl font-semibold mb-1">Brand Logo</h1>
          <p className="text-gray-500 text-md mb-6">Customize the brand logo that would be displayed on the channel.</p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Preview Section */}
            <div className="mb-6">
              <p className="text-base font-medium mb-2">Preview</p>
              <div className="w-full py-3 bg-gray-100 flex justify-center items-center">
                <h3 className="text-lg font-bold text-center uppercase" style={{ color: selectedTextColor }}>
                  {brandName}
                </h3>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Section */}
              <div className="flex-1 w-full flex-wrap md:w-[80%]">
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={!useLogo} onChange={() => setUseLogo(false)} className="w-5 h-5" />
                    <span className="font-bold">Name</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="p-3 border w-full rounded-md mb-4"
                />
                <div>
                  <h2 className="text-base text-[#53525F] font-medium mb-2">Change Color</h2>
                  <div className="flex flex-wrap gap-x-2 gap-y-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded border ${selectedTextColor === color ? 'border-2 border-black' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedTextColor(color)} // Set text color
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Logo Section */}
              <div className="flex-1 w-full flex-wrap md:w-[80%]">
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" checked={useLogo} onChange={() => setUseLogo(true)} className="w-5 h-5" />
                    <span className="font-bold">Logo</span>
                  </label>
                </div>
                <div className="border-dashed border-2 border-gray-300 rounded-md py-4 w-full h-40 flex justify-center items-center mb-4">
                  {logo ? (
                    <Image src={logo} alt="Logo Preview" className="w-32 h-32 object-contain" />
                  ) : (
                    <span className="text-gray-500">No logo uploaded</span>
                  )}
                </div>
                <input
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLogo(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => document.getElementById('logoUpload')?.click()}
                >
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Color Picker */}
        <div className="mt-8 mx-auto">
          <h2 className="text-xl font-semibold mb-4">Pick a background color</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex-1 w-full flex-wrap md:w-[80%]">
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded border ${selectedBackground === color ? 'border-2 border-black' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedBackground(color)}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={selectedBackground}
                  onChange={(e) => setSelectedBackground(e.target.value)}
                  className="mt-4 w-8 h-8"
                />
              </div>
              <div className="flex-1 justify-center w-full">
                <h1 className="text-lg text-[#53525F] font-semibold mb-4">Preview</h1>
                <SkeletonLoader background={selectedBackground} />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6  mx-auto flex justify-end">
          <button className="bg-main-blue text-white px-6 py-2 rounded-md text-lg font-semibold" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomiseChannel;
