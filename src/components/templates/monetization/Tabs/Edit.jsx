import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { FaTimes } from 'react-icons/fa';
const AddProd = () => {
  const modalHandler = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 md:ml-64 overflow-auto">
        <div className=" border-2 border-[#DFE0E1] m-5 w-[450px]">
          <div className="flex justify-between p-3">
            <p className="font-semibold text-xl capitalize">add product</p>
            <span></span>
            <button className="bg-gray-200 px-4 py-2 rounded-lg" onClick={modalHandler}>
              Delete
            </button>
          </div>
          <p className="font-semibold text-xl capitalize p-3">description</p>

          {openModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold">Modal Title</h2>
                <p className="mt-2 text-gray-600">This is a simple modal.</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="p-3">
            <label className="text-sm font-semibold text-[#DFE0E1] flex items-center">Product Name</label>
            <input
              type="text"
              placeholder="Wallet address"
              className="w-full p-2 mt-1 border-2 border-[#DFE0E1] rounded-md focus:outline-none"
            />
          </div>

          <div className="p-3">
            <label className="text-sm font-semibold text-[#53525f] flex items-center">Upload Image</label>
            <input type="file" className="w-full p-2 mt-1 border-2 border-[#DFE0E1] rounded-md focus:outline-none" />
          </div>

          <div className="p-3">
            <label className="text-sm font-semibold text-[#53525f] flex items-center">Description</label>
            <textarea className="w-full h-24 p-2 mt-1 border-2 border-[#53525f] rounded-md resize-none focus:outline-none"></textarea>
          </div>
          <div className="flex">
            <div className="p-3">
              <p className="font-semibold text-l capitalize">pricing</p>
              <label className="text-sm font-semibold text-[#53525f] flex items-center">Price (USD)</label>
              <input
                type="text"
                placeholder="Wallet address"
                className="w-full p-2 mt-1 border-2 border-[#53525f] rounded-md focus:outline-none"
              />
            </div>

            <div className="p-3">
              <p className="font-semibold text-l capitalize">inventory</p>
              <label className="text-sm font-semibold text-[#53525f] flex items-center">Quantity</label>
              <input
                type="text"
                placeholder="Wallet address"
                className="w-full p-2 mt-1 border-2 border-[#53525f] rounded-md focus:outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="flex justify-end space-x-2 m-4">
            <button className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProd;
