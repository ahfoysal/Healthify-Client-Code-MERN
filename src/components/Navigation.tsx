import { tv } from 'tailwind-variants';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Spinner } from '@nextui-org/spinner';
import { Tooltip } from '@nextui-org/tooltip';

import { useHover } from '@react-aria/interactions';
import { NavLink } from 'react-router-dom';

import { UseSettings } from '@/hooks/useLocalStorage';
import { Icons } from '@/assets/icons/Icons';
import ChevronLeft from '@/assets/icons/ChevronLeftIcon';
import ChevronRight from '@/assets/icons/ChevronRightIcon';
import { BookCopy, List, ListPlus } from 'lucide-react';

export function NavigationBrowse() {
  const { sidebarMiniMode, sidebarHoverMode, sidebarBoxedMode } = UseSettings();
  const { hoverProps: sidebarHoverProps, isHovered } = useHover({
    isDisabled: !sidebarHoverMode.value,
  });
  const navigationItemWidthStyle =
    sidebarMiniMode.value && !isHovered ? 'w-[56px]' : 'w-[160px]';

  return (
    <aside
      {...sidebarHoverProps}
      className={sidebarStyles({
        sidebarMiniMode: sidebarMiniMode.value,
        sidebarBoxedMode: sidebarBoxedMode.value,
        sidebarHoverMode: isHovered,
      })}
    >
      <div className="relative my-5">
        <button
          className={`
         flex  fixed 
         ${
           sidebarMiniMode.value && !isHovered
             ? 'left-[calc(87px-13px)]'
             : 'left-[calc(200px-13px)]'
         }
          top-10 transition-all duration-200 rounded-full border bg-background border-dashed 
          border-divider p-0 flex justify-center items-center  w-[26px] h-[26px] 
          `}
          onClick={() => {
            sidebarMiniMode.set(!sidebarMiniMode.value);
          }}
        >
          {sidebarMiniMode.value ? (
            <ChevronRight width={16} height={16} size={16} />
          ) : (
            <ChevronLeft width={16} height={16} size={16} />
          )}
        </button>
      </div>
      <div className="mb-3 ml-0 flex h-[65px]  w-full flex-row items-center justify-start">
        <NavLink
          to="/"
          arial-label="home-page"
          className={`${
            sidebarMiniMode.value && !isHovered
              ? 'basis-[50px]'
              : 'basis-[60px]'
          } ml-4 flex shrink-0 grow-0 justify-center`}
        >
          <Icons.logoICon className="text-red" />
        </NavLink>
      </div>
      <NavigationMenu
        orientation="vertical"
        // viewportPositionClassName
        viewportPositionClassName={viewportPositionStyles({
          sidebarMiniMode: sidebarMiniMode.value,
          sidebarHoverMode: sidebarHoverMode.value,
          sidebarBoxedMode: sidebarBoxedMode.value,
        })}
      >
        <NavigationMenuList className="m-0 mt-3 gap-1 [&_.active]:bg-active [&_.active]:text-default-foreground">
          {!sidebarMiniMode.value && (
            <p className="text-tiny text-left   w-full ml-5 text-muted-foreground">
              OVERVIEW
            </p>
          )}
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="analytics"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Analytics"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/analytics"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px] justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } flex text-muted-foreground text-sm`}
                    >
                      <Icons.analytics
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Analytics'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          {!sidebarMiniMode.value && (
            <p className="text-tiny text-left mt-3  text-muted-foreground w-full ml-5">
              User
            </p>
          )}
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="user"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="User"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/user/list"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px] justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } text-muted-foreground text-sm flex`}
                    >
                      <Icons.person
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'List'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          {!sidebarMiniMode.value && (
            <p className="text-tiny text-left mt-3  text-muted-foreground w-full ml-5">
              Test
            </p>
          )}
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="test"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Test"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/test/list"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px] justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } text-muted-foreground text-sm flex`}
                    >
                      <Icons.medList
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'List'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="test-new"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Test"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/test/new"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px] justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } text-muted-foreground text-sm flex`}
                    >
                      <Icons.medAdd
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Create'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          {!sidebarMiniMode.value && (
            <p className="text-tiny text-left mt-3  text-muted-foreground w-full ml-5">
              Bookings
            </p>
          )}
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="Bookings"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Bookings List"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/booking/list"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px]  justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } flex text-muted-foreground text-sm`}
                    >
                      <BookCopy
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'List'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          {!sidebarMiniMode.value && (
            <p className="text-tiny text-left mt-3  text-muted-foreground w-full ml-5">
              Banners
            </p>
          )}
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="banner"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Banner"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/banner/list"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px]  justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } flex text-muted-foreground text-sm`}
                    >
                      <List
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'List'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
          <NavigationMenuItem
            className={`${navigationItemWidthStyle} text-left transition-[width] duration-200`}
            value="banner-create"
          >
            <Tooltip
              isDisabled={
                !sidebarMiniMode.value || (sidebarHoverMode && isHovered)
              }
              placement="right"
              content="Create banner"
              offset={10}
              showArrow
            >
              <NavigationMenuLink asChild>
                <NavLink
                  to="/admin/banner/new"
                  className={navigationMenuTriggerStyle({
                    class: `${navigationItemWidthStyle} h-[43px]  justify-start transition-[width]  duration-200`,
                  })}
                >
                  {({ isActive, isPending }) => (
                    <div
                      className={`${
                        isActive && 'text-red-active '
                      } flex text-muted-foreground text-sm`}
                    >
                      <ListPlus
                        className={`${
                          !sidebarMiniMode.value ||
                          (sidebarHoverMode && isHovered)
                            ? 'mr-4'
                            : ''
                        } `}
                      />
                      {!sidebarMiniMode.value || (sidebarHoverMode && isHovered)
                        ? 'Create'
                        : null}
                      <Spinner
                        size="sm"
                        classNames={{
                          base:
                            isPending &&
                            (!sidebarMiniMode.value ||
                              (sidebarHoverMode && isHovered))
                              ? 'ml-auto'
                              : '!hidden',
                          circle1: 'border-b-default-foreground',
                          circle2: 'border-b-default-foreground',
                        }}
                      />
                    </div>
                  )}
                </NavLink>
              </NavigationMenuLink>
            </Tooltip>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
}

const sidebarStyles = tv({
  base: 'top-5 fixed z-5 box-border hidden shrink-0 grow-0 transition-[max-width] duration-400 sm:block',
  variants: {
    sidebarMiniMode: {
      true: 'w-full max-w-[87px] basis-[87px]',
      false: 'w-full max-w-[200px] basis-[200px]',
    },
    sidebarBoxedMode: {
      true: 'left-[15px] top-[15px] h-[calc(100vh_-_30px)] rounded-large border border-divider backdrop-blur-lg shadow-medium',
      false: 'left-0 top-0 h-screen',
    },
    sidebarHoverMode: {
      true: 'w-full max-w-[200px] basis-[200px] rounded-r-large border border-divider backdrop-blur-lg shadow-2xl',
    },
  },
  compoundVariants: [{}],
  defaultVariants: {
    sidebarMiniMode: false,
    sidebarBoxedMode: false,
  },
});

const viewportPositionStyles = tv({
  base: '!fixed',
  variants: {
    sidebarMiniMode: {
      true: '!left-[85px]',
    },
    sidebarHoverMode: {
      true: '!left-[200px]',
    },
    sidebarBoxedMode: {
      true: '!left-[265px]',
    },
  },
  compoundVariants: [
    {
      sidebarMiniMode: true,
      sidebarHoverMode: true,
      sidebarBoxedMode: false,
      class: '!left-[200px]',
    },
    {
      sidebarMiniMode: true,
      sidebarHoverMode: false,
      sidebarBoxedMode: true,
      class: '!left-[100px]',
    },
    {
      sidebarMiniMode: false,
      sidebarHoverMode: false,
      sidebarBoxedMode: false,
      class: '!left-[200px]',
    },
  ],
  defaultVariants: {
    sidebarMiniMode: false,
    sidebarHoverMode: false,
    sidebarBoxedMode: false,
  },
});
