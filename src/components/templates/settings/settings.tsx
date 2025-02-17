'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from '@/assets/Avatar.png'; // Update the path to your avatar image
import Header from '@/components/Header';
import { Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    username: 'Bolaji Majekodunmi',
    email: 'bolajimajekodunmi@gmail.com',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (field: string) => {
    setEditField(field);
  };

  const handleSave = (field: string) => {
    setEditField(null);
    // Logic to save changes for the specified field
  };

  return (
    <>
      <Header />
      <div className="m-2">
        <div className="p-5">
          <h3 className="text-lg font-bold mb-4">Profile</h3>
          <div className="bg-white p-6 shadow rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <Image src={Avatar} alt="Avatar" className="rounded-full" />
              <button className="bg-main-blue text-white px-4 py-2 rounded-md">Change Avatar</button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`border px-4 py-2 w-full md:w-1/2 outline-none rounded-md border-[#DFE0E1] bg-gray-100 ${editField === 'username' ? '' : 'pointer-events-none'}`}
                readOnly={editField !== 'username'}
              />
              {editField === 'username' ? (
                <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleSave('username')}>
                  Save Changes
                </button>
              ) : (
                <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleEdit('username')}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="p-5 w-full md:w-[80%]">
          <h3 className="text-lg font-bold mb-4">Security</h3>

          <div className="w-full overflow-hidden rounded-md border shadow-md mb-4 border-[#DFE0E1]">
            <div className="bg-[#DFE0E166] p-3">
              <h1 className="block text-black font-bold mb-1">Password</h1>
            </div>
            <div className="p-6">
              <div className="flex flex-col">
                <label className="text-gray-700">Current Password</label>
                <div className="relative w-full md:w-1/2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    placeholder="Enter your current password"
                    onChange={handleChange}
                    className="border px-4 py-2 w-full border-[#DFE0E1]  placeholder:text-sm outline-none rounded-md bg-gray-100"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 my-6">
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="New password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="border px-4 py-2 w-full border-[#DFE0E1] placeholder:text-sm outline-none rounded-md bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="text-sm text-[#838294]" />
                      ) : (
                        <Eye className="text-sm text-[#838294]" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label className="text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      placeholder="Re-enter Password"
                      onChange={handleChange}
                      className="border px-4 py-2 w-full border-[#DFE0E1] placeholder:text-sm outline-none rounded-md bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="text-sm text-[#838294]" />
                      ) : (
                        <Eye className="text-sm text-[#838294]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {formData.newPassword &&
                formData.confirmPassword &&
                formData.newPassword === formData.confirmPassword && (
                  <div className="flex space-x-2 mt-4">
                    <button className="bg-main-blue text-white px-4 py-2 rounded-md">Save Changes</button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setFormData({ ...formData, newPassword: '', confirmPassword: '' })}
                    >
                      Cancel
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Email */}
          <div className="w-full overflow-hidden rounded-md border shadow-md mb-6 pb-4 border-[#DFE0E1]">
            <div className="bg-[#DFE0E166] p-3">
              <h1 className="block text-black font-bold mb-1">Email</h1>
            </div>
            <div className="flex items-center p-6">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border px-4 py-2 w-full md:w-1/2 outline-none border-[#DFE0E1] rounded-md bg-gray-100 ${editField === 'email' ? '' : 'pointer-events-none'}`}
                readOnly={editField !== 'email'}
              />
              {editField === 'email' ? (
                <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleSave('email')}>
                  Save Changes
                </button>
              ) : (
                <button className="bg-main-blue text-white px-4 py-2 rounded-md" onClick={() => handleEdit('email')}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
