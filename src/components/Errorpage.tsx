'use client';

import { useRouter } from 'next/navigation';
const ErrorPage = ({ message }: { message: string }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold mb-4">Error</h1>
      <p className="text-lg mb-4">{message}</p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;