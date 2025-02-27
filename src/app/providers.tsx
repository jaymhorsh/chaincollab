'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { Provider } from 'react-redux';
import store from '../store/store';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { EthBalanceContextType } from '@/interfaces';

const EthBalanceContext = createContext<EthBalanceContextType | undefined>(undefined);

const EthBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ready } = usePrivy();
  const { wallets } = useWallets();
  const [ethBalance, setEthBalance] = useState('');
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);
  const [chainName, setChainName] = useState('');

  // Mapping of chain IDs (in decimal) to human-friendly names.
  const chainNames: { [key: number]: string } = {
    1: 'Ethereum Mainnet',
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli',
    42: 'Kovan',
    11155111: 'Sepolia',

  };

  const refreshBalance = useCallback(async () => {
    if (!ready) return;
    const wallet = wallets[0]
    if (wallet) {
      try {
        const provider = await wallet.getEthereumProvider();
console.log(provider)
        // Get the current chain id (in hex)
        const currentChainId = await provider.request({ method: 'eth_chainId' });
        console.log('Connected chain ID (hex):', currentChainId);

        // Convert hex chain id to decimal
        const chainIdDecimal = parseInt(currentChainId, 16);
        console.log('Connected chain ID (decimal):', chainIdDecimal);

        // Get the human-friendly chain name
        const displayName = chainNames[chainIdDecimal] || `Chain ID: ${chainIdDecimal}`;
        setChainName(displayName);
        console.log('Connected chain name:', displayName);

        // Create an ethers.js provider and fetch the balance
        const ethProvider = new ethers.providers.Web3Provider(provider);
        const balance = (await ethProvider.getBalance(wallet.address));
        console.log('mount', balance);
        const formattedBalance = ethers.utils.formatEther(balance);
        console.log('Balance:', formattedBalance);

        

        //  const balance = ethers.formatEther(
  //   (await provider.getBalance(address)).toString() // balance is in wei
  // );
        setEthBalance(formattedBalance);
        setEmbeddedWallet(wallet);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  }, [ready, wallets]);

  useEffect(() => {
    refreshBalance();
  }, [ready, wallets, refreshBalance]);

  return (
    <EthBalanceContext.Provider value={{ ethBalance, embeddedWallet, refreshBalance, chainName }}>
      {children}
    </EthBalanceContext.Provider>
  );
};
import {base} from 'viem/chains'
import { defineChain } from 'viem';

export const ethereumMainnet = defineChain({
  id: 1, // Ethereum Mainnet chain ID
  name: 'Ethereum Mainnet',
  network: 'homestead', // This is the network name used for Ethereum Mainnet
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      // Cloudflare's free Ethereum mainnet endpoint.
      // You can replace this with another provider (e.g., Infura or Alchemy) if desired.
      http: ['https://cloudflare-eth.com'],
      // Optionally, if you have a WebSocket endpoint, include it here:
      // webSocket: ['wss://mainnet.infura.io/ws/v3/YOUR-PROJECT-ID'],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_ENVIRONMENT_ID ?? ''}
      config={{
        appearance: {
          landingHeader: '',
          loginMessage: 'Welcome to Chainfren TV',
          theme: 'light',
          accentColor: '#3351FF',
          showWalletLoginFirst: false,
          logo: 'https://res.cloudinary.com/dbkthd6ck/image/upload/v1737309623/chainfren_logo_eey39b.png',
          walletList: ['metamask', 'phantom', 'rainbow', 'wallet_connect', 'okx_wallet', 'bybit_wallet'],
        },
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord', 'linkedin'],
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
        defaultChain: ethereumMainnet,
        supportedChains: [ethereumMainnet, base, ] ,

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


















// 'use client';

// import { PrivyProvider } from '@privy-io/react-auth';
// import { Provider } from 'react-redux';
// import store from '../store/store';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { usePrivy, useWallets } from '@privy-io/react-auth';
// import { ethers } from 'ethers';
// import { EthBalanceContextType } from '@/interfaces';

// const EthBalanceContext = createContext<EthBalanceContextType | undefined>(undefined);

// const EthBalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { ready } = usePrivy();
//   const { wallets } = useWallets();
//   const [ethBalance, setEthBalance] = useState('');
//   const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);
// //   const wallet = wallets.find((w) => w.walletClientType === 'privy');
// // console.log('address:', wallet?.chainId);
//   const refreshBalance = async () => {
//     if (!ready) return;
//     const wallet = wallets.find((w) => w.walletClientType === 'privy');
//     if (wallet) {
//       try {
//         const provider = await wallet.getEthereumProvider();
       
//         const currentChainId = await provider.request({ method: 'eth_chainId' });
//         console.log('Connected chain ID:', currentChainId);
//         const ethProvider = new ethers.providers.Web3Provider(provider);
//         const balance = await ethProvider.getBalance(wallet.address);
//         console.log('Balance:', ethers.utils.formatEther(balance));
//         setEthBalance(ethers.utils.formatEther(balance));
//         setEmbeddedWallet(wallet);
//       } catch (error) {
//         console.error('Error refreshing balance:', error);
//       }
//     }A
//   };
 
//   useEffect(() => {
//     refreshBalance();
//   }, [ready, wallets, refreshBalance]);

//   return (
//     <EthBalanceContext.Provider value={{ ethBalance, embeddedWallet, refreshBalance }}>
//       {children}
//     </EthBalanceContext.Provider>
//   );
// };

// export default function Providers({ children }: { children: React.ReactNode }) {
  
//   // console.log('Connected network:', network); // logs network name and chainId
  
//   return (
//     <PrivyProvider
//       appId={process.env.NEXT_PUBLIC_PRIVY_ENVIRONMENT_ID ?? ''}
//       config={{
//         // Customize Privy's appearance in your app
//         appearance: {
//           // Defaults to 'Log in or sign up'
//           landingHeader: '',
//           loginMessage: 'Welcome to Chainfren TV',
//           theme: 'light',
//           accentColor: '#3351FF',
//           showWalletLoginFirst: false,
//           logo: 'https://res.cloudinary.com/dbkthd6ck/image/upload/v1737309623/chainfren_logo_eey39b.png',
//           walletList: ['metamask', 'phantom', 'rainbow', 'wallet_connect', 'okx_wallet', 'bybit_wallet'],
//         },
//         loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord', 'linkedin'],
//         // Create embedded wallets for users who don't have a wallet
//         embeddedWallets: {
//           createOnLogin: 'users-without-wallets',
//         },
//       }}
//     >
//       <Provider store={store}>
//         <EthBalanceProvider>{children}</EthBalanceProvider>
//       </Provider>
//     </PrivyProvider>
//   );
// }

// export const useEthBalance = () => {
//   const context = useContext(EthBalanceContext);
//   if (!context) {
//     throw new Error('useEthBalance must be used within an EthBalanceProvider');
//   }
//   return context;
// };
