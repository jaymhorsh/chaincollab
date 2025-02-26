'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { RotatingLines } from 'react-loader-spinner';

type AlertDialogDemoProps = {
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const AlertDialogs: React.FC<AlertDialogDemoProps> = ({
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Yes, delete channel',
  onConfirm,
  open,
  setOpen,
  loading,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-80 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <button
              onClick={() => setOpen(false)}
              className="inline-flex px-4 py-3 min-w-24 items-center justify-center rounded text-sm font-medium leading-none text-mauve11 outline-none hover:bg-gray-100 focus:shadow-[0_0_0_1px]"
            >
              {cancelLabel}
            </button>
            <button
              className="inline-flex px-4 py-3 min-w-48 items-center justify-center rounded bg-red-100 text-sm font-medium leading-none text-red-600 outline-none hover:bg-red-200"
              onClick={onConfirm}
            >
              {loading ? (
                <RotatingLines
                  visible={true}
                  strokeWidth="5"
                  animationDuration="0.75"
                  strokeColor="red"
                  ariaLabel="rotating-lines-loading"
                  width="14"
                />
              ) : (
                confirmLabel
              )}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
