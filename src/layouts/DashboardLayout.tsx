import { Outlet } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { UseSettings } from '@/hooks/useLocalStorage';
import SideBar from '@/components/shared/SIdeBar';
import Navbar from './AdminNavbar';

export default function DashboardLayout() {
  const { sidebarMiniMode } = UseSettings();

  return (
    <div>
      <div className="   min-h-screen    flex max-h-full  max-w-full flex-nowrap justify-start  transition-[padding] duration-200 p-0">
        <SideBar />

        <div
          className={contentAreaStyles({
            mini: sidebarMiniMode.value,
          })}
        >
          <Navbar />
          <div className="my-8  max-w-7xl w-[95%] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
const contentAreaStyles = tv({
  base: ' ml-0   flex w-full  border-dashed  grow flex-col   overflow-hidden  bg-background shadow-medium transition-[margin] duration-200 sm:border-divider ',
  variants: {
    mini: {
      true: 'sm:ml-[87px]  sm:border-l ',
    },
    hideSidebar: {
      true: 'sm:ml-0',
    },
  },
  compoundVariants: [
    {
      mini: true,
      boxed: true,
      hideSidebar: false,
      class: 'sm:ml-[110px]  ',
    },
    {
      mini: false,
      boxed: false,
      hideSidebar: false,
      class: 'sm:ml-[200px]  sm:border-l ',
    },
    {
      boxed: true,
      hideSidebar: true,
      class: 'sm:ml-[15px]  ',
    },
  ],
  defaultVariants: {
    mini: false,
    boxed: false,
    hideSidebar: false,
  },
});
