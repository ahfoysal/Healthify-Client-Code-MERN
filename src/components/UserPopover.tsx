/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@nextui-org/button';
import { Separator } from './ui/separator';

import React from 'react';
import { IUser } from '@/hooks/AuthContextProvider';
import { ModeToggle } from './ui/ModeToggle';
interface UserPopoverProps {
  user: IUser | any;
  logout: () => Promise<void>; // Change the type to Promise<void>
}

const UserPopover: React.FC<UserPopoverProps> = ({ user, logout }) => {
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log('User logged out');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={6}
        alignOffset={0}
        className=" z-[1000] bg-[#26262ada] backdrop-blur-2xl text-white rounded-lg backdrop-contrast-125 backdrop-saturate-200 border-[#262626]"
      >
        <div className="flex flex-col items-center">
          <p className="text-lg ">{user?.email}</p>
          <Separator className="my-4" />
          <ModeToggle />
          <Button
            fullWidth
            variant="light"
            className=" bg-[#27272A] rounded-xl py-1 px-4 text-white"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserPopover;
