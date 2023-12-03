import React from 'react';
import toast, { Toast } from 'react-hot-toast';

interface UploadingProps {
  item: Toast;
  selectedFile: File;
}
const UploadingToast: React.FC<UploadingProps> = ({ item, selectedFile }) => {
  return (
    <div
      className={`${
        item.visible ? 'animate-enter' : 'animate-leave'
      } max-w-xs w-full border-divider bg-secondary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-20 w-20 rounded-lg"
              src={URL.createObjectURL(selectedFile)}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-500  ">Uploading to</p>
            <p className="mt-1 text-base font-medium dark:text-white text-gray-900">
              Ollyo Photos
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-divider">
        <button
          onClick={() => toast.dismiss(item.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadingToast;
