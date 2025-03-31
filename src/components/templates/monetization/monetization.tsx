'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Money from './Tabs/Monetize';
import Subscription from './Tabs/Subscription';
import Donations from './Tabs/Donations';
import Store from './Tabs/Store/Store';
import Header from '@/components/Header';
import History from './Tabs/History/History';
import { useState } from 'react';
import MobileSidebar from '@/components/MobileSidebar';

const Monetization: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <MobileSidebar
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen  h-full ">
        <Header toggleMenu={toggleMobileMenu} mobileOpen={mobileMenuOpen} />
        <div className="m-2 border rounded-md min-h-[85vh] overflow-auto bg-white pb-4 px-4 md:px-6">
          <Tabs defaultValue="overview" className="w-full  mx-auto">
            <TabsList className=" justify-start items-center flex flex-wrap h-full shadow-none rounded-none my-5 bg-transparent gap-2">
              <TabsTrigger
                value="overview"
                className=" text-black font-semibold  md:text-lg data-[state=active]:border-b-[3px] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="subcription"
                className=" text-black font-semibold md:text-lg   data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue "
              >
                Subcriptions
              </TabsTrigger>
              <TabsTrigger
                value="donations"
                className=" text-black font-semibold md:text-lg data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue"
              >
                Donations
              </TabsTrigger>
              <TabsTrigger
                value="store"
                className=" text-black font-semibold md:text-lg   data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue "
              >
                Store
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="  text-black font-semibold md:text-lg  data-[state=active]:border-b-[3px]   data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue "
              >
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="md:w-[90%] max-sm:w-full">
              <Money />
            </TabsContent>
            <TabsContent value="subcription" className="md:w-[55%] max-sm:w-full">
              <Subscription />
            </TabsContent>
            <TabsContent value="donations" className="md:w-[55%] max-sm:w-full">
              <Donations />
            </TabsContent>
            <TabsContent value="store" className="md:w-[65%] max-sm:w-full">
              <Store />
            </TabsContent>
            <TabsContent value="history" className="md:w-[55%] max-sm:w-full">
              <History />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Monetization;
