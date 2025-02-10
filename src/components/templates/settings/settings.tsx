'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from '@/assets/Avatar.png'; // Update the path to your avatar image

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    username: 'Kelvin Agboje',
    email: 'johndoe@email.com',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (field: string) => {
    // Logic to handle edit action for the specified field
  };

  return (
    <div className="m-2">
      <div className="p-5">
        <h3 className="text-lg font-bold mb-4">Profile</h3>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <Image src={Avatar} alt="Avatar" width={50} height={50} className="rounded-full" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Change Avatar</button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border px-4 py-2 w-1/2 rounded-md bg-gray-100"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit('username')}>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-4">Security</h3>
        <div className="bg-white p-6 shadow rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">Password</label>
            <div className="flex items-center space-x-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border px-4 py-2 w-1/2 rounded-md bg-gray-100"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit('password')}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
