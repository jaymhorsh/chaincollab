'use client';
import ErrorPage from '@/components/Errorpage';
import Spinner from '@/components/Spinner';
import { getStreamById } from '@/features/streamAPI';
import { AppDispatch, RootState } from '@/store/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { BroadcastWithControls } from './broadcast/Broadcast';

const StreamPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get('id') : '';
  const dispatch = useDispatch<AppDispatch>();
  const { stream, loading, error } = useSelector((state: RootState) => state.streams);
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

  console.log('stream', stream);
  return (
    <div>
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
