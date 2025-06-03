"use client"

import React, { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, UserCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { invalidateSession } from '@/server/auth/authenticate';
import { useSession } from 'next-auth/react';
import ThemeToggle from '../actions/theme-toggle';

const Navbar = ({
  onSidebarToggle,
  sidebarOpen,
}: {
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}) => {
  const {data: session} = useSession();

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">Wedding Organizer</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-200" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="py-1">
                <MenuItem>
                  <a
                    href='#'
                    className={`data-focus:bg-gray-100 dark:data-focus:bg-gray-700 flex items-center gap-2 px-4 h-15 text-sm text-gray-700 dark:text-gray-200`}>
                      <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-200" /> 
                      {session?.user.name}
                  </a>
                  
                </MenuItem>
                <hr className="border-1 mx-2" />
                <MenuItem>
                  <a
                    href="#"
                    className={` data-focuks:bg-gray-100 dark:data-focus:bg-gray-700 flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                    <Cog6ToothIcon className="w-5 h-5" /> Setting
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); invalidateSession() }}
                    className={`data-focus:bg-gray-100 dark:data-focus:bg-gray-700 flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                    <ArrowLeftStartOnRectangleIcon className="w-5 h-5" /> Logout
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </nav>
  )
};

export default Navbar;