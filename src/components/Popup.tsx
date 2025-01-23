import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiLink } from 'react-icons/hi';
import { PiCalendarCheckBold } from 'react-icons/pi';
import { RiDeleteBin6Line, RiTokenSwapFill } from 'react-icons/ri';
import { AlertDialogs } from './Alert';
// import { deleteStream } from "@/app/actions";
import { toast } from 'sonner';

const listItemClassNames = {
  option: 'flex items-center px-5 py-2  hover:bg-gray-100 cursor-pointer',
  icon: 'text-black-primary-text text-lg font-bold ',
};

interface PopupProps {
  showOptions: boolean;
  toggleOptions: () => void;
  handleClickOutside: (event: MouseEvent) => void;
  optionsRef: React.RefObject<HTMLDivElement>;
  streamId?: string;
  playbackId?: string;
  host?: string;
}

export const Popup = ({
  showOptions,
  toggleOptions,
  handleClickOutside,
  optionsRef,
  streamId,
  playbackId,
  host,
}: PopupProps) => {
  const playbackUrl = `${host}/view/${playbackId}`;
  console.log(playbackUrl);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    // try {
    //   const response = await deleteStream(streamId);
    //   if (response.success) {
    //     toast.success("Stream deleted successfully");
    //     // toggleOptions();
    //     setTimeout(() => setOpen(false), 50);
    //   } else {
    //     toast.error(response.error);
    //   }
    // } catch (error) {
    //   toast.error((error as Error).message || "An error occurred while deleting the stream.");
    // }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions, handleClickOutside]);

  const handleDeleteClick = () => {
    toggleOptions();
    setTimeout(() => setOpen(true), 50);
  };

  return (
    <div className="relative">
      <BsThreeDotsVertical
        className="text-lg cursor-pointer text-black-primary-text focus:ring-blue-600 focus:ring-2 focus:ring-offset-2"
        onClick={toggleOptions}
      />
      {showOptions && (
        <div
          ref={optionsRef}
          className="absolute right-0 w-60 z-10 py-2  bg-white border border-border-gray rounded-lg shadow-lg"
        >
          <ul>
            <li className={listItemClassNames.option} onClick={toggleOptions}>
              <HiLink className={listItemClassNames.icon} />
              <p className="ml-2 text-sm text-black-primary-text font-medium  ">Edit details</p>
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
                    toast.error('Stream link isnt available.');
                  });
                toggleOptions();
              }}
            >
              <AiOutlineEdit className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text ">Copy Stream Link</p>
            </li>
            <li className={listItemClassNames.option} onClick={toggleOptions}>
              <PiCalendarCheckBold className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text ">Schedule stream</p>
            </li>
            <li className={listItemClassNames.option} onClick={toggleOptions}>
              <BiNotepad className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text">Customize channel</p>
            </li>
            <li className={listItemClassNames.option} onClick={handleDeleteClick}>
              <RiDeleteBin6Line className={listItemClassNames.icon} />
              <p className="ml-2 text-sm font-medium text-black-primary-text ">Delete channel</p>
            </li>
          </ul>
          <div className="border-t border-border-gray my-2"></div>
          <div className={listItemClassNames.option}>
            <RiTokenSwapFill className={listItemClassNames.icon} />
            <p className="ml-2 text-sm font-medium text-black-primary-text ">Token set-up</p>
          </div>
        </div>
      )}
      <AlertDialogs
        title="Delete channel"
        description="Are you sure you want to delete this stream? This action cannot be undone."
        onConfirm={handleDelete}
        open={open}
        loading={loading}
        setOpen={setOpen}
      />
    </div>
  );
};
