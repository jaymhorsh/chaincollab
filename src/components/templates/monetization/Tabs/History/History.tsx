import { Tabs, TabsTrigger,TabsList, TabsContent } from '@/components/ui/Tabs'

import React from 'react'

const History = () => {
  return (
   <div className='m-2'>
    <h1>Transaction History</h1>
    <div>
        <Tabs defaultValue="All" className="w-full mx-auto">
            <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Withdrwals">Withdrawals</TabsTrigger>
                <TabsTrigger value="Subscribtions">Subsriptions</TabsTrigger>
                <TabsTrigger value="Donations">Donations</TabsTrigger>
                <TabsTrigger value="Store">Store Sales</TabsTrigger>
            </TabsList>
            <TabsContent value="All">
                <div className='m-2 w-[50%]' >
                   <div className='border border-gray-100  '>
                    <div className='flex justify-between p-2 border-b border-gray-100'>
                       <div className='flex gap-5 '>
                        {/* icons */}
                        <div className='flex-col '>
                              <p className='text-lg'>Donations from User123</p>
                              <p className='text-sm text-grey-100'>today 2:20pm</p>
                        </div>
                      
                       </div>
                    </div>
                    
                   </div>

                </div>
            </TabsContent>
            <TabsContent value="Subscriptions">
                <div className='m-2'>
                </div>
            </TabsContent>
            <TabsContent value="Donations">
                <div className='m-2'>
                </div>
            </TabsContent>
            <TabsContent value="Store">
                <div className='m-2'>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</div>
  )
}

export default History