import { useContext } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@nextui-org/button';
import { AuthContext } from '@/hooks/AuthContextProvider';
import toast from 'react-hot-toast';

type DeletePopoverProps = {
  mutate: any;
  children: any;
  id: any;
  handleCancelClick: any;
  userRole?: any;
};

export function DeletePopover({
  mutate,
  children,
  id,
  userRole,
  handleCancelClick,
}: DeletePopoverProps) {
  const { user } = useContext(AuthContext);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={5}
        alignOffset={0}
        className="z-[1000] bg-modal max-w-sm p-4  backdrop-blur-2xl rounded-lg backdrop-contrast-125 backdrop-saturate-200  shadow-xl"
      >
        <h1 className="text-base">Are you sure you want to delete?</h1>
        <div className="mt-4 flex justify-end w-full gap-2">
          <Button variant="flat" onClick={() => handleCancelClick()}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              if (user && user._id === id) {
                handleCancelClick();
                return toast.error('You Cant Delete Yourself');
              } else if (userRole && userRole === 'admin') {
                handleCancelClick();
                return toast.error('You Cant Delete a admin');
              } else {
                handleCancelClick();
                mutate(id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
