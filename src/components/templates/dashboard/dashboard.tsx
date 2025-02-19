'use client';
import Header from '@/components/Header';
import Analytics from './Analytics';
import SectionCard from '@/components/Card/SectionCard';
import { ChannelCard, VideoCard } from '@/components/Card/Card';
import { RiVideoAddLine } from 'react-icons/ri';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import { CreateLivestream } from '@/components/CreateLivestream';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import clsx from 'clsx';
import { usePrivy } from '@privy-io/react-auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStreams } from '@/features/streamAPI';
import { RootState, AppDispatch } from '@/store/store';
import image1 from '../../../../public/assets/images/image1.png';
import { Stream } from '@/interfaces';

const Dashboard = () => {
  const { user } = usePrivy();
  const dispatch = useDispatch<AppDispatch>();
  const { streams, loading, error } = useSelector((state: RootState) => state.streams);
  useEffect(() => {
    dispatch(getAllStreams());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredStreams = streams.filter(
    (stream:any) =>
      !!stream.playbackId &&
      stream.creatorId.value === user?.wallet?.address
  );

  const updatedStreams = streams.filter((stream: Stream) => !stream.playbackId);
  const totalPages = Math.ceil(filteredStreams.length / itemsPerPage);
  const navigate = useRouter();

  if (!user) {
    navigate.push('/auth/login');
  }

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch streams: ' + error);
    }
  }, [error]);

  const initiateLiveVideo = (id: string) => {
    if (id) {
      navigate.push(`/dashboard/stream?id=${id}`);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedStreams = filteredStreams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log('streams', paginatedStreams.map((stream) => stream.creatorId?.value));
  console.log('user', user?.wallet?.address);

  return (
    <div>
      <Header />
      <div className="m-2">
        <Analytics />
        <SectionCard title="Your Channels">
          <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
              <div className="flex w-full flex-col" onClick={() => setIsDialogOpen(true)}>
                <div className="w-full justify-center flex items-center h-[180px] rounded-lg cursor-pointer bg-background-gray">
                  <RiVideoAddLine className="text-main-blue w-24 h-24" />
                </div>
                <div className="text-black-primary-text text-xl font-bold pt-2">Create new stream channel</div>
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
              <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] flex mt-4 flex-col justify-center items-center max-w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-10 max-sm:px-6 py-6 shadow-lg">
                <Dialog.Title className="text-black-primary-text text-center my-4 text-base font-bold">
                  Create New Channel
                </Dialog.Title>
                <CreateLivestream close={() => setIsDialogOpen(false)} />
                <Dialog.Close asChild>
                  <button
                    className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                    aria-label="Close"
                  >
                    <IoMdClose className="text-black-primary-text font-medium text-4xl" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        
          {loading ? (
            Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[180px] w-[318px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 md:w-[316px] rounded-md" />
                  <Skeleton className="h-7 w-[44px] rounded-md" />
                </div>
              </div>
            ))
          ) : (
            <>
              {filteredStreams.length === 0 ? (
                <div className="flex justify-center items-center h-60">
                  <p className="text-black-primary-text">No streams available.</p>
                </div>
              ) : (
                paginatedStreams.map((stream) => (
                  <div key={stream.id}>
                    <ChannelCard
                      title={stream.name}
                      image={image1}
                      goLive={() => initiateLiveVideo(stream.id)}
                      streamId={stream.id}
                      playbackId={stream.id}
                    />
                  </div>
                ))
              )}
            </>
          )}
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  className="px-3 py-1 mx-1 rounded-md"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt; {/* Left Chevron */}
                </button>
                <span className="text-black">
                  {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 mx-1 rounded-md"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt; {/* Right Chevron */}
                </button>
              </div>
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={clsx(
                      'px-3 py-1 mx-1 rounded-md',
                      currentPage === index + 1 ? 'bg-main-blue text-white' : 'bg-gray-200 text-black',
                    )}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        <hr className=" border-border-gray" />
        <SectionCard title="Your Videos">
          {updatedStreams.length > 0 &&
            updatedStreams.map((stream: Stream) => (
              <div key={stream.id}>
                <VideoCard title={stream.name} createdAt={''} onAction={() => initiateLiveVideo(stream.id)} imageUrl={image1} />
              </div>
            ))}
        </SectionCard>
      </div>
    </div>
  );
};

export default Dashboard;