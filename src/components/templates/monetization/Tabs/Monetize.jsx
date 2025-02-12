import Ramp from '@/assets/Ramp.png';
import Tranzak from '@/assets/Tranzak.png';
import Stripe from '@/assets/Stripe.png';
import Lefi from '@/assets/Lefi.png';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { useState } from 'react';

const Monetize = () => {
  const [showPayment, setShowPayment] = useState(false);
  const showPaymntHandler = () => {
    setShowPayment(!showPayment);
  };

  return (
    <div>
      <div className="flex flex-wrap md:grid md:grid-cols-2  md:gap-x-5 md:p-[10px] md:w-[85%]">
        <div className="bg-white shadow-lg p-6 rounded-lg w-full">
          <div className="bg-black text-white h-[164px] p-4 rounded-lg ">
            <div className="">
              <div className="flex justify-between items-center p-[10px]">
                <p className="text-2xl font-normal">Wallet Balance</p>
                <button className="text-gray-400 text-sm">History</button>
              </div>
              <p className="text-[2rem] p-[10px] font-semibold">$10,000.00</p>
            </div>
          </div>
          {/* <h3 className="font-bold text-xl">Choose payment method</h3> */}
          <div className='mt-4'>
               <button
            className={`capitalize w-full p-[8px] bg-main-blue rounded-md text-white ${showPayment ? 'hidden' : ''}`}
            onClick={showPaymntHandler}
          >
            withdraw
          </button>
          </div>
         
          {showPayment && (
            <div className="mt-4">
              <label className="text-sm font-semibold text-[#DFE0E1]">Amount</label>
              <input
                type="number"
                placeholder="$"
                className="w-full p-2 mt-2 border-2 border-[#DFE0E1] rounded-md focus:outline-none"
              />

              <label className="text-sm font-semibold mt-[10px] text-[#DFE0E1] flex items-center">
                Wallet Address <AiFillExclamationCircle />
              </label>
              <input
                type="text"
                placeholder="Wallet address"
                className="w-full p-2 mt-2 border-2 border-[#DFE0E1] rounded-md focus:outline-none"
              />

              <button className="w-full mt-4 bg-main-blue text-white py-2 rounded-lg font-semibold">Withdraw</button>
              <p className="text-center text-[#5D7285] p-[10px]"> Or use </p>
              <div className="flex justify-around mt-2">
                <img src={Stripe} alt="Stripe" />
                <img src={Lefi} alt="Lefi" />
                <img src={Ramp} alt="Ramp" />
                <img src={Tranzak} alt="Tranzak" />
              </div>
              <div className="bg-[#E4E6E8] p-[10px] mt-[20px]">
                <p className="text-xs mt-4">
                  ⚠️Funds may be irrecoverable if you enter an incorrect wallet address. It is crucial to ensure the
                  accuracy of the provided wallet address to avoid any loss.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className=" w-full mt-4 md:mt-0">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3 ">
            <div className="col-span-1 border-2 border-[#DFE0E1] rounded-lg">
              <h3 className="font-bold text-xl p-[10px]">Revenue</h3>
              <p className="text-2xl font-bold p-[10px]">$2,193.00</p>
            </div>

            <div className="col-span-1 border-2 border-[#DFE0E1] rounded-lg">
              <h3 className="font-bold text-xl p-[10px]">Subscribers</h3>
              <p className="text-2xl font-bold p-[10px]">1,234</p>
            </div>

            <div className="col-span-1 border-2 border-[#DFE0E1] rounded-lg">
              <h3 className="font-bold text-xl p-[10px]">Store Orders</h3>
              <p className="text-2xl font-bold p-[10px]">100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monetize;
