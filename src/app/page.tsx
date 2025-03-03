'use client';
import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (!ready) return;

    if (authenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [ready, authenticated, router]);

  return <Spinner />;
}
