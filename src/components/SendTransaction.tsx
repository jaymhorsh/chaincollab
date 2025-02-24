import { ethers } from 'ethers';
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/router';
type Props = {
  sendTransaction: any;
  amount: string;
  sendAddress: string;
};

function SendTransaction({ sendTransaction, amount, sendAddress }: Props) {
  const router = useRouter();
  const sendTx = async () => {
    try {
      if (!sendAddress) return;
      const etherAmount = amount || '';
      const weiValue = ethers.utils.parseEther(etherAmount);
      const hexWeiValue = ethers.utils.hexlify(weiValue);

      const unsignedTx = {
        to: sendAddress,
        chainId: 11155111,
        value: hexWeiValue,
      };

      const txUiConfig = {
        header: 'Send Transaction',
        description: `Send ${amount} ETH to ${sendAddress}`,
        buttonText: 'Send',
      };

      await sendTransaction(unsignedTx, txUiConfig);
      toast.success('Transaction sent successfully!');
      router.reload();
    } catch (error: any) {
      toast.error('Transaction failed: ' + error.message);
    }
  };

  return (
    <button
      onClick={sendTx}
      disabled={!sendAddress}
      className="w-full mt-4 bg-main-blue text-white py-2 rounded-md font-semibold hover:bg-blue-600 "
    >
      {amount ? `Withdraw ${amount} ETH` : 'Withdraw'}
    </button>
  );
}

export default SendTransaction;
