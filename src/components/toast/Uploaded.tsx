import { Button } from '@nextui-org/button';
import { X } from 'lucide-react';
import React from 'react';
import toast, { Toast } from 'react-hot-toast';

interface UploadingProps {
  item: Toast;
  selectedFile: File;
}
const UploadedToast: React.FC<UploadingProps> = ({ item, selectedFile }) => {
  return (
    <div
      className={`${
        item.visible ? 'animate-enter' : 'animate-leave'
      } max-w-xs border-divider p-2 w-full bg-secondary shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
    >
      <div className=" mt-3  w-full flex-1  flex justify-between">
        <p className="text-sm dark:text-gray-100 text-gray-500 ">
          1 Item Uploaded{' '}
        </p>
        <Button
          size="sm"
          variant="flat"
          onClick={() => toast.dismiss(item.id)}
          className="flex justify-en bg-transparent"
        >
          <X />
        </Button>
      </div>
      <div className="flex-shrink-0 pt-0.5">
        <img
          className="h-[328px] w-[328px] rounded-sm"
          src={URL.createObjectURL(selectedFile)}
          alt=""
        />
      </div>
    </div>
  );
};

export default UploadedToast;
