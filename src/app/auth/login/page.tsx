'use client';
import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth'; // Make sure to import the login function from Privy
import { useRouter } from 'next/navigation';
import AuthLayout from '@/layout/AuthLayout';

const Page = () => {
  const { login } = usePrivy();
  const navigate = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    }
  }, [ready, authenticated]);

  if (ready && authenticated) {
    navigate.push('/dashboard');
  }

  return (
    <AuthLayout>
      <div className="flex justify-center items-center h-screen"></div>
    </AuthLayout>
  );
};
export default Page;
