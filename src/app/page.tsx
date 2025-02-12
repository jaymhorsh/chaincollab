'use client';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  // useEffect(() => {
  //   if (ready) {
  //     if (authenticated) {
  //       router.push('/dashboard');
  //     } else if (!authenticated) {
  //       router.push('/auth/login');
  //     }
  //   }
  // }, [ready, authenticated, router]);

  // if (!ready) {
  //   return (
  //     <div
  //       style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
  //       // onClick={(e) => e.stopPropagation()}
  //     >
  //       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
  //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      // onClick={(e) => e.stopPropagation()}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    </div>
  );
}
