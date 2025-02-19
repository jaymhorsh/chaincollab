'use client';
import ErrorPage from '@/components/Errorpage';
import Spinner from '@/components/Spinner';
import { getStreamById } from '@/features/streamAPI';
import { AppDispatch, RootState } from '@/store/store';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { BroadcastWithControls } from './broadcast/Broadcast';

const StreamPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get('id') : '';
  const dispatch = useDispatch<AppDispatch>();
  const { stream, loading, error } = useSelector((state: RootState) => state.streams);
  const navigate = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getStreamById(id));
    } else if (error) {
      toast.error(error || 'Stream ID is required');
    }
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  } else if (!loading && !stream) {
    return <ErrorPage message="Stream not available." />;
  } else if (!loading && error) {
    return <ErrorPage message="Failed to fetch the stream. Please try again later." />;
  }

  const handleGoBack = () => {
    navigate.push('/dashboard');
  };

  if (!stream.streamKey || !stream.playbackId || !stream.name) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">No ongoing stream </h2>
        <p className="text-gray-600 mb-4">Please start your stream from the dashboard.</p>
        <button
          className="bg-main-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleGoBack}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen p-6 bg-gray-100">
      <BroadcastWithControls
        streamName={stream.name}
        streamKey={stream.streamKey}
        isActive={stream.isActive}
        createdAt={stream.createdAt}
        playbackId={stream.playbackId}
      />
    </div>
  );
};

export default StreamPage;
