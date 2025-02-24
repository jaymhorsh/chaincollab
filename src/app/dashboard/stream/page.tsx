'use client';
import StreamPage from '@/components/templates/stream/stream';
import { Suspense } from 'react';

const Page = () => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="animate-pulse h-8 w-96 bg-gray-200 rounded" />}>
        <StreamPage />
      </Suspense>
    </div>
  );
};

export default Page;
