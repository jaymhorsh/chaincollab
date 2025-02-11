'use client';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Inter } from 'next/font/google';
import { LuArrowLeftFromLine } from 'react-icons/lu';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });
// Rename the component to follow React naming conventions
const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className={`${inter.className} text-black-primary-text flex h-screen `}>
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-72 px-4 bg-white shadow-md">
        <div className="pl-4 flex justify-between items-center">
          <div className=" py-6 font-bold uppercase text-black-primary-text">
            <h1> Creator Dashboard</h1>
          </div>
          <button onClick={toggleDrawer} className="md:hdden">
            <LuArrowLeftFromLine className="text-xl font-bold" />
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* Drawer for mobile */}
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black bg-opacity-50 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      />
      <aside
        className={clsx(
          'fixed px-4 inset-y-0 left-0 z-30 w-72 bg-white shadow-md transform transition-transform duration-500 ease-in-out',
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full',
          'md:hidden',
        )}
      >
        <div className="pl-4 flex justify-between items-center">
          <div className=" py-6 font-bold uppercase text-black-primary-text">
            <h1> Creator Dashboard</h1>
          </div>
          <button onClick={toggleDrawer} className="md:hidden">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflw-hidden">
        {/* Page content */}
        <main className="flex-1 text-orange overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-1">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
