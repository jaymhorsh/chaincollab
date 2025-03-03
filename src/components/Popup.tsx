'use client';
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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
import { resetStreamStatus } from '@/features/streamSlice';

const listItemClassNames = {
  option: 'flex items-center text-lg px-5 py-2 hover:bg-gray-100 cursor-pointer',
  icon: 'text-black-primary-text text-xl font-bold',
};

export const Popup = ({ playbackId, streamId }: PopupProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, success } = useSelector((state: RootState) => state.streams);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const playbackUrl =
    host && playbackId ? `${host.includes('localhost') ? 'http' : 'https'}://${host}/view/${playbackId}` : null;

  const handleEditDetails = () => {
    toast('Edit details clicked');
    // TODO: Open edit modal or navigate to edit page.
  };

  const handleCopyStreamLink = () => {
    if (playbackUrl) {
      navigator.clipboard
        .writeText(playbackUrl)
        .then(() => {
          toast.success('Stream link copied!');
        })
        .catch(() => {
          toast.error("Stream link isn't available.");
        });
    } else {
      toast.error("Stream link isn't available.");
    }
  };

  const handleScheduleStream = () => {
    toast('Schedule stream clicked');
    // TODO: Open schedule modal or navigate accordingly.
  };

  const handleCustomizeChannel = () => {
    toast('Customize channel clicked');
    // TODO: Open customization modal or navigate accordingly.
  };

  const handleDeleteChannel = () => {
    // Simply open the alert dialog.
    setAlertOpen(true);
  };
  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteStream(streamId)).unwrap();
      if (success) {
        toast.success('Channel deleted successfully');
        dispatch(resetStreamStatus());
      }
    } catch (err: any) {
      if (error) {
        toast.error(error);
        toast.error(error || 'Failed to delete channel');
      }
    }
    setIsLoading(false);
    setAlertOpen(false);
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2">
            <BsThreeDotsVertical className="text-lg cursor-pointer text-black-primary-text focus:bg-main-blue focus:ring-2 focus:ring-offset-2" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[200px] min-h-[200px] z-50 bg-white rounded shadow-md p-2">
          <DropdownMenu.Item onSelect={handleEditDetails} className={listItemClassNames.option}>
            <HiLink className={listItemClassNames.icon} />
            <p className="ml-2 text-sm text-black-primary-text font-medium">Edit details</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={handleCopyStreamLink} className={listItemClassNames.option}>
            <AiOutlineEdit className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text">Copy Stream Link</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={handleScheduleStream} className={listItemClassNames.option}>
            <PiCalendarCheckBold className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text">Schedule stream</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={handleCustomizeChannel} className={listItemClassNames.option}>
            <BiNotepad className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text">Customize channel</p>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={handleDeleteChannel} className={listItemClassNames.option}>
            <RiDeleteBin6Line className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text">Delete channel</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <AlertDialogs
        open={alertOpen}
        setOpen={setAlertOpen}
        title="Delete Channel"
        description="Are you sure you want to delete this channel? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="Yes, delete channel"
        onConfirm={confirmDelete}
        loading={isLoading}
      />
    </>
  );
};

{
  /* <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2">
            <IoMdMore className="text-xl" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-[200px] bg-white rounded shadow-md p-2">
          <DropdownMenu.Item
            onSelect={handleEditDetails}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            Edit details
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleCopyStreamLink}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            Copy Stream Link
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleScheduleStream}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            Schedule stream
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleCustomizeChannel}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            Customize channel
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleDeleteChannel}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            Delete channel
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root> */
}
