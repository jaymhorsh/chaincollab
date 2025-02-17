
import { Button } from "@/components/ui/button"
import Header from '@/components/templates/customizeHeader/Header';
import React from 'react';
import InputField from "@/components/ui/InputField";

const Page = () => {
  return (
  <div className="flex flex-col gap-5">
    <Header />
    <div className="md:hidden px-[20px]">
      <Button className="hidden md:hidden">
          Change Channel
        </Button>
        <Button className="hidden md:hidden">
          Preview Channel
        </Button>
    </div>
    <div className="px-[40px]">
      <h1 className="text-[16px] font-[700] text-[#000000]">About</h1>
      <div className="bg-[#FFFFFF] p-[20px] flex flex-col gap-5">
        <div>
          <label className="text-[16px] font-[500] text-[#53525F]">Title</label>
          <InputField type="text" label="title"/>
        </div>
        <div>
          <label className="text-[16px] font-[500] text-[#53525F]">Description</label>
          <InputField className="h-[77px]" type="text" label="description"/>
        </div>
      </div>
    </div>
    <div className="px-[40px] flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[16px]">
        <h1 className="text-[#000000] text-[18px] font-[700]">Brand Logo</h1>
        <p className="text-[#53525F] text-[16px] font-[500] ">Customize the brand logo that would be displayed on the channel</p>
      </div>
      <div className="rounded-[4px] border border-[#DFE0E1] p-10 bg-white">
        <div className="flex flex-col gap-5">
          <p className="text-[16px] font-[500]">Preview</p>
          <Button className="w-full bg-[#F5F5F7] text-[#53525F] bg-White">WAGMI DAO</Button>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Page;