import { AnalyticCard } from '@/components/Card/Card'
import { DatePickerWithRange } from '@/components/daterange'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cardData } from '../../../../public/assets/data'
import { ChartComponent } from './Chart'
import { TopChart } from './topChatrt'

const Analytics = () => {
  return (
    <div className='px-[30px] py-[20px] flex flex-col gap-[40px] bg-[#FFFFFF] h-full'>
        <div className='flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[20px] text-[#0E0E0F] font-[700]'>Summary</h1>
                <div className="flex items-center gap-5">
                    <Button>All Channels</Button>
                    <DatePickerWithRange />
                    <Button>All</Button>
                    <Button>This month</Button>
                </div>
            </div>
            <div className='grid grid-cols-3 items-center gap-5 mx-'>
                {
                    cardData.map((item, index) => (
                        <AnalyticCard key={index} title={item.title} change={item.change} views={item.views} value={item.value} />
                    ))
                }
            </div>
        </div>
        <TopChart />
        <ChartComponent />
    </div>
  )
}

export default Analytics
