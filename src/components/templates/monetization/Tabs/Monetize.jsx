import Ramp from '@/assets/Ramp.png';
import Tranzak from '@/assets/Tranzak.png';
import Stripe from '@/assets/Stripe.png';
import Lefi from '../../../../assets/Lefi.png';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useState } from 'react';
import Image from 'next/image';

const Monetize = () => {
  const [showPayment, setShowPayment] = useState(false);
  const showPaymntHandler = () => {
    setShowPayment(!showPayment);
  };

  const dummyData = [
    { id: 1, name: 'Revenue', balance: '$5,000.00' },
    { id: 2, name: 'Subscribers', balance: '$3,200.00' },
    { id: 3, name: 'Store Holders', balance: '$1,800.00' },
  ];

  return (
    <div>
      <div className="flex flex-wrap md:grid md:grid-cols-7 md:gap-x-5 md:w-[85%]">
        <div className="bg-white shadow-lg p-6 rounded-lg border border-[#DFE0E1] md:col-span-3 w-full">
          <div className="bg-black text-white h-[164px] p-4 rounded-lg">
            <div className="">
              <div className="flex justify-between items-center p-[10px]">
                <p className="text-2xl font-normal">Wallet Balance</p>
                <button className="text-gray-400 text-sm">History</button>
              </div>
              <p className="text-[2rem] p-[10px] font-semibold">$10,000.00</p>
            </div>
          </div>
          <div className="mt-6">
            <button
              className={`capitalize w-full p-[8px] bg-main-blue rounded-md text-white ${showPayment ? 'hidden' : ''}`}
              onClick={showPaymntHandler}
            >
              withdraw
            </button>
          </div>

          {showPayment && (
            <div>
              <p className="font-semibold text-black my-4">Choose Payment Method</p>
              <label className="font-semibold text-[#9EAAB6]">Amount</label>
              <input
                type="number"
                placeholder="$"
                className="w-full p-2 mt-2 border-2 border-[#DFE0E1] rounded-md focus:outline-none"
              />

              <label className="font-semibold mt-[10px] text-[#9EAAB6] flex gap-2 items-center">
                Wallet Address <AiOutlineExclamationCircle className="text-lg" />
              </label>
              <input
                type="text"
                placeholder="Wallet address"
                className="w-full p-2 mt-2 border-2 border-[#DFE0E1] rounded-md focus:outline-none"
              />

              <button className="w-full mt-4 bg-main-blue text-white py-2 rounded-md font-semibold">Withdraw</button>
              <p className="text-center text-[#5D7285] text-sm p-[10px]"> Or use </p>
              <div className="flex justify-around mt-2">
                <div className="w-14 h-14 relative">
                  <Image src={Stripe} alt="Stripe" layout="fill" objectFit="contain" />
                </div>
                <div className="w-14 h-14 relative">
                  <Image src={Lefi} alt="Lefi" layout="fill" objectFit="contain" />
                </div>
                <div className="w-14 h-14 relative">
                  <Image src={Ramp} alt="Ramp" layout="fill" objectFit="contain" />
                </div>
                <div className="w-14 h-14 relative">
                  <Image src={Tranzak} alt="Tranzak" layout="fill" objectFit="contain" /> 
                </div>
              </div>
              <div className="bg-[#E4E6E8] flex rounded-md gap-3 p-2 mt-[20px]">
                <AiOutlineExclamationCircle className="flex text-4xl text-[#5D7285]" />
                <p className="text-sm">
                  Funds may be irrecoverable if you enter an incorrect wallet address. It is crucial to ensure the
                  accuracy of the provided wallet address to avoid any loss.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mt-4 md:mt-0 md:col-span-4">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3">
            {dummyData.map(({ id, name, balance }) => (
              <div key={id} className="col-span-1 font-inter border-2 px-5 p-4 border-[#DFE0E1] rounded-lg">
                <h3 className="font-bold text-xl text-[#0E0E0F] pb-3">{name}</h3>
                <p className="text-[34px] font-bold text-[#0E0E0F]">{balance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monetize;
