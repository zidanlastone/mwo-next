"use client"
import React from 'react'
import useDarkMode from '@/utils/hooks/use-dark';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100 rounded-full">
      <button
        onClick={toggleDarkMode}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none rounded-full"
        aria-label="Toggle sidebar"
      >
        {isDarkMode ?  <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" /> }
      </button>
    </div>
  )
}

export default ThemeToggle