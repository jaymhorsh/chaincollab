'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { Provider } from 'react-redux';
import store from '../store/store';

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
     <Provider store={store}>{children}</Provider>
    </PrivyProvider>
  );
}
