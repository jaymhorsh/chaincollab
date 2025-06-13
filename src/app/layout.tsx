import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import Providers from './providers';
import { headers } from 'next/headers';
import '@coinbase/onchainkit/styles.css';
import { cookieToInitialState } from 'wagmi';
import getConfig from 'next/config';

export const metadata: Metadata = {
  title: 'Chainfren TV',
  description: 'Chainfren TV',
  icons: {
    icon: './assets/images/favicon.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main>
            <Toaster position="top-center" richColors />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
