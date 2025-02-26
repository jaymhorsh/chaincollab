'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { Provider } from 'react-redux';
import store from '../store/store';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { EthBalanceContextType } from '@/interfaces';

const EthBalanceContext = createContext<EthBalanceContextType | undefined>(undefined);

const EthBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const [ethBalance, setEthBalance] = useState('');
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);

  const refreshBalance = async () => {
    if (!ready) return;
    const wallet = wallets.find((w) => w.walletClientType === 'privy');
    if (wallet) {
      try {
        const provider = await wallet.getEthereumProvider();
        // Switch to the desired chain (11155111)
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${Number(11155111).toString(16)}` }],
        });
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const balance = await ethProvider.getBalance(wallet.address);
        setEthBalance(ethers.utils.formatEther(balance));
        setEmbeddedWallet(wallet);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  };

  useEffect(() => {
    refreshBalance();
  }, [ready, wallets, refreshBalance]);

  return (
    <EthBalanceContext.Provider value={{ ethBalance, embeddedWallet, refreshBalance }}>
      {children}
    </EthBalanceContext.Provider>
  );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ENVIRONMENT_ID ?? ''}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          // Defaults to 'Log in or sign up'
          landingHeader: '',
          loginMessage: 'Welcome to Chainfren TV',
          theme: 'light',
          accentColor: '#3351FF',
          showWalletLoginFirst: false,
          logo: 'https://res.cloudinary.com/dbkthd6ck/image/upload/v1737309623/chainfren_logo_eey39b.png',
          walletList: ['metamask', 'phantom', 'rainbow', 'wallet_connect', 'okx_wallet', 'bybit_wallet'],
        },
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord', 'linkedin'],
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <Provider store={store}>
        <EthBalanceProvider>{children}</EthBalanceProvider>
      </Provider>
    </PrivyProvider>
  );
}

export const useEthBalance = () => {
  const context = useContext(EthBalanceContext);
  if (!context) {
    throw new Error('useEthBalance must be used within an EthBalanceProvider');
  }
  return context;
};
