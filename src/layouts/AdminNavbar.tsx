import UserPopover from '@/components/UserPopover';

import { AuthContext } from '@/hooks/AuthContextProvider';

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { useContext } from 'react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar maxWidth="full">
      <NavbarContent justify="end">
        <NavbarItem>
          <UserPopover user={user} logout={logout} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
export default Header;
