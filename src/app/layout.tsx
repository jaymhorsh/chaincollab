import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import Providers from './providers';

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
            {children}
            <Toaster position="top-center" richColors />
         </main>
        </Providers>
      </body>
    </html>
  );
}
