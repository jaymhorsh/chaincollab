import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Money from './Tabs/Monetize';
import Subscription from './Tabs/Subscription';
import Donations from './Tabs/Donations';
import Store from './Tabs/Store';
import Header from '@/components/Header';

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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subcribtion">Subcribtions</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Monetization;
