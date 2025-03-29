import Image from 'next/image';
import React from 'react';
import backgroundimg from '../../public/assets/images/background.jpeg';

import logo from '../../public/assets/logo.svg';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center bg-loginImage bg-cover bg-center justify-center min-h-screen p-8 gap-16 sm:p-20 relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundimg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(7px)',
          zIndex: -1,
        }}
      />
      <main className="flex flex-col items-center justify-center drop-shadow-lg rounded-xl py-10">{children}</main>
    </div>
  );
};

export default AuthLayout;
