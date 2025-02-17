import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/Tabs';
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';

// Dummy data
const transactions = [
  { id: 1, type: 'Donations', user: 'User123', amount: 50, date: 'today 2:20pm' },
  { id: 2, type: 'Withdrawals', user: 'User456', amount: 100, date: 'yesterday 1:15pm' },
  { id: 3, type: 'Subscriptions', user: 'User789', amount: 20, date: 'today 3:45pm' },
  { id: 4, type: 'Store', user: 'User321', amount: 150, date: 'last week 4:30pm' },
  { id: 5, type: 'Donations', user: 'User654', amount: 75, date: 'today 5:00pm' },
  { id: 6, type: 'Withdrawals', user: 'User987', amount: 200, date: 'yesterday 11:00am' },
  { id: 7, type: 'Subscriptions', user: 'User321', amount: 30, date: 'today 6:30pm' },
  { id: 8, type: 'Store', user: 'User654', amount: 250, date: 'last month 2:00pm' },
];

const History = () => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((transaction) => transaction.type === activeTab));
    }
  }, [activeTab]);

  return (
    <div className="">
      <h1 className="text-2xl py-3 font-bold">Transaction History</h1>
      <div>
        <Tabs defaultValue="All" className="w-full mx-auto" onValueChange={setActiveTab}>
          <TabsList className="gap-2 p-5 md:w-[45%] w-full">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="Subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="Donations">Donations</TabsTrigger>
            <TabsTrigger value="Store">Store Sales</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
          <TabsContent value="Withdrawals">
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
          <TabsContent value="Subscriptions">
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
          <TabsContent value="Donations">
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
          <TabsContent value="Store">
            <TransactionList transactions={filteredTransactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface Transaction {
  id: number;
  type: string;
  user: string;
  amount: number;
  date: string;
}

const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  return (
    <div className="md:w-[50%] w-full">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="border rounded-lg border-gray-200 mb-2">
          <div className="flex justify-between p-4 font-inter border-gray-100">
            <div className="flex gap-5">
              <div
                className={`flex items-center rounded-full p-3 ${transaction.type === 'Withdrawals' ? 'bg-[#FF00001A]' : 'bg-[#04EB2A1A]'}`}
              >
                {transaction.type === 'Withdrawals' ? (
                  <FiArrowUpRight className="text-2xl text-[#FE5C2B]" />
                ) : (
                  <FiArrowDownRight className="text-2xl text-[#04EB2A]" />
                )}
              </div>
              <div className="flex-col">
                <p className="text-lg font-semibold">
                  {transaction.type} from {transaction.user}
                </p>
                <p className="text-sm text-[#838294]">{transaction.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-inter font-semibold">
                {transaction.type === 'Withdrawals'
                  ? `- $${transaction.amount.toFixed(2)}`
                  : `+$${transaction.amount.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
