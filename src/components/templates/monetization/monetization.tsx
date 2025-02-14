import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Money from './Tabs/Monetize';
import Subscription from './Tabs/Subscription';
import Donations from './Tabs/Donations';
import Store from './Tabs/Store';
import Header from '@/components/Header';
import History from './Tabs/History/History';

const Monetization: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="m-2 border rounded-md min-h-[85vh] bg-white py-4 px-6 h-full">
        <Tabs defaultValue="overview" className="w-full  mx-auto">
          <TabsList className="border-b-2 shadow-none rounded-none  pb-2 bg-transparent my-4 gap-4">
            <TabsTrigger value="overview" className=" text-black font-semibold  md:text-lg data-[state=active]:border-b-[3px] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue">Overview</TabsTrigger>
            <TabsTrigger value="subcription" className=" text-black font-semibold md:text-lg   data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">Subcriptions</TabsTrigger>
            <TabsTrigger value="donations" className= " text-black font-semibold md:text-lg data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue">Donations</TabsTrigger>
            <TabsTrigger value="store" className=" text-black font-semibold md:text-lg   data-[state=active]:border-b-[3px]  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">Store</TabsTrigger>
            <TabsTrigger value="history" className="  text-black font-semibold md:text-lg  data-[state=active]:border-b-[3px]   data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Money />
          </TabsContent>
          <TabsContent value="subcription">
            <Subscription />
          </TabsContent>
          <TabsContent value="donations">
            <Donations />
          </TabsContent>
          <TabsContent value="store">
            <Store />
          </TabsContent>
          <TabsContent value="history">
            <History/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Monetization;
