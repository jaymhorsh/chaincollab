import { AnalyticCard } from '@/components/Card/Card'
import { DatePickerWithRange } from '@/components/daterange'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cardData } from '../../../../public/assets/data'
import { ChartComponent } from './Chart'
import { TopChart } from './topChatrt'
import Performance from './Performance'

const Analytics = () => {
  return (
    <div className='py-4 px-4 pb-10 md:py-6 flex flex-col gap-10 bg-white h-full'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col md:flex-row pt-10 justify-between'>
          <h1 className='text-xl md:text-xl lg:text-2xl text-black font-bold'>Summary</h1>
          <div className="flex flex-wrap sm:items-center gap-3 md:gap-5 mt-3 md:mt-0">
            <Button className='bg-main-blue'>All Channels</Button>
            <DatePickerWithRange />
            <Button className='bg-main-blue'>All</Button>
            <Button className='bg-main-blue'>This month</Button>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            cardData.map((item, index) => (
              <AnalyticCard key={index} title={item.title} change={item.change} views={item.views} value={item.value} />
            ))
          }
        </div>
      </div>
      <div className='flex flex-col lg:flex-col gap-5 w-full md:w-[70%]'>
        <TopChart />
        <ChartComponent />
        <Performance />
      </div>
    </div>
  )
}

export default Analytics