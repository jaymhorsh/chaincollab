import React from 'react';
import Shirt from '@/assets/Shirt.png';

const Store = () => {
  return (
    <div>
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
        <h3 className="font-bold text-xl">select channel</h3>
        <div className="mt-4 shadow-lg p-6 rounded-lg bg-white w-full md:w-[805px] w">
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl">Active Products</h3>
            <button className="bg-blue-500 p-[7px] w-[140px] rounded-md">
              {/* <NavLink to="/AddProd">Add Product</NavLink> */}
            </button>
          </div>

          <div className="flex mt-6 border-2 border-[#DFE0E1] p-6 rounded-lg bg-white ">
            <img src={Shirt} alt="" />
            <div className="ml-2 flex justify-between items-center w-full">
              <div className="">
                <h3 className="font-bold text-2xl uppercase">WAGMI DAO T-Shirt - Black</h3>
                <span className="text-gray-500 font-bold">$40.00</span>
              </div>
              <button className="p-[7px] w-[140px] rounded-md border-2 border-black ">
                {/* <NavLink to="/Edit">Edit</NavLink> */}
              </button>
            </div>
          </div>

          <div className="flex mt-6 border-2 border-[#DFE0E1] p-6 rounded-lg">
            <img src={Shirt} alt="" />
            <div className="ml-2 flex justify-between items-center w-full">
              <div className="">
                <h3 className="font-bold text-2xl uppercase">WAGMI DAO T-Shirt - Black</h3>
                <span className="text-gray-500 font-bold">$40.00</span>
              </div>
              <button className="p-[7px] w-[140px] rounded-md border-2 border-black ">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
