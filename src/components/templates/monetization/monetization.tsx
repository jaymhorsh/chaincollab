import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Money from './Tabs/Monetize';
import Subscription from './Tabs/Subscription';
import Donations from './Tabs/Donations';
import Store from './Tabs/Store';
import Header from '@/components/Header';
import History from './Tabs/History/History';

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Monetization: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="m-2 ">
        <Tabs defaultValue="overview" className="w-full mx-auto">
          <TabsList className="border-b shadow-none rounded-none pb-2 bg-transparent my-4 gap-4">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue">Overview</TabsTrigger>
            <TabsTrigger value="subcribtion" className="  data-[state=active]:border-b-2  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">Subcribtions</TabsTrigger>
            <TabsTrigger value="donations" className= "data-[state=active]:border-b-2  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue">Donations</TabsTrigger>
            <TabsTrigger value="store" className="  data-[state=active]:border-b-2  data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">Store</TabsTrigger>
            <TabsTrigger value="history" className="  data-[state=active]:border-b-2   data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-main-blue data-[state=active]:text-main-blue ">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Money />
          </TabsContent>
          <TabsContent value="subcribtion">
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
