'use client';
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-56 rounded-md py-1 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

//
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiLink } from 'react-icons/hi';
import { PiCalendarCheckBold } from 'react-icons/pi';
import { RiDeleteBin6Line, RiTokenSwapFill } from 'react-icons/ri';
import { AlertDialogs } from './Alert';
import { PopupProps } from '@/interfaces/index';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStream } from '@/features/streamAPI';
import { AppDispatch, RootState } from '@/store/store';
import { RotatingLines } from 'react-loader-spinner';

const listItemClassNames = {
  option: 'flex items-center px-5 py-2 hover:bg-gray-100 cursor-pointer',
  icon: 'text-black-primary-text text-lg font-bold',
};

export const Popup = ({ playbackId, streamId, host }: PopupProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.streams);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const playbackUrl = `${host}/view/${playbackId}`;

  const handleDelete = () => {
    setLoading(true);
    if (streamId) {
      dispatch(deleteStream(streamId));
    }
    if (success) {
      toast.success('Stream deleted successfully');
      setAlertOpen(false);
      setLoading(false);
    } else if (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  // useEffect(() => {

  // }, [success, error]);

  const handleDeleteClick = () => {
    setTimeout(() => setAlertOpen(true), 50);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <BsThreeDotsVertical className="text-lg cursor-pointer text-black-primary-text focus:bg-main-blue focus:ring-2 focus:ring-offset-2" />
      </PopoverTrigger>
      <PopoverContent className="left-[30]">
        <div>
          <ul>
            <li className={listItemClassNames.option} onClick={() => {}}>
              <HiLink className={listItemClassNames.icon} />
              <p className="ml-2 text-sm text-black-primary-text font-medium">Edit details</p>
            </li>
            <li
              className={listItemClassNames.option}
              onClick={() => {
                navigator.clipboard
                  .writeText(playbackUrl)
                  .then(() => {
                    toast.success('Stream link copied!');
                  })
                  .catch(() => {
                    toast.error("Stream link isn't available.");
                  });
              }}
            >
              <AiOutlineEdit className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text">Copy Stream Link</p>
            </li>
            <li className={listItemClassNames.option} onClick={() => {}}>
              <PiCalendarCheckBold className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text">Schedule stream</p>
            </li>
            <li className={listItemClassNames.option} onClick={() => {}}>
              <BiNotepad className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text">Customize channel</p>
            </li>
            <li className={listItemClassNames.option} onClick={handleDeleteClick}>
              <RiDeleteBin6Line className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text">Delete channel</p>
            </li>
          </ul>
          <div className="border-t border-border-gray my-2"></div>
          <div className={listItemClassNames.option}>
            <RiTokenSwapFill className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text">Token set-up</p>
          </div>
        </div>
        <AlertDialogs
          title="Delete channel"
          description="Are you sure you want to delete this stream? This action cannot be undone."
          onConfirm={handleDelete}
          open={alertOpen}
          loading={loading}
          setOpen={setAlertOpen}
        />
        {isloading && (
          <div className="flex justify-center items-center mt-2">
            <RotatingLines
              visible={true}
              strokeWidth="5"
              animationDuration="0.75"
              strokeColor="#000"
              ariaLabel="rotating-lines-loading"
              width="24"
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
