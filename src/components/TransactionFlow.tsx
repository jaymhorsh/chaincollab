import React, { useState } from 'react';
import SendTransaction from './SendTransaction';
import { usePrivy } from '@privy-io/react-auth';

const TransactionFlow: React.FC = () => {
  const { sendTransaction } = usePrivy();
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');

  return (
    <div className="max-w-md mx-auto mt-8">
      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Initiate Transaction
          </button>
        </div>
      ) : (
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Send Transaction</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="amount">
                Amount in ETH
              </label>
              <input
                id="amount"
                type="text"
                placeholder="e.g. 0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="sendAddress">
                Recipient Address
              </label>
              <input
                id="sendAddress"
                type="text"
                placeholder="e.g. 0x..."
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
                className="border rounded w-full p-2"
              />
            </div>
            <SendTransaction sendTransaction={sendTransaction} amount={amount} sendAddress={sendAddress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFlow;
