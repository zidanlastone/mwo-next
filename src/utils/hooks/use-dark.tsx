"use client"

import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if(typeof window != undefined){
        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme) {
          return savedTheme === "dark";
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false
  });

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const html = document.documentElement;
      if (newMode) {
        html.dataset.theme = 'dark';
        window.localStorage.setItem("theme", "dark");
      } else {
        html.dataset.theme = 'light';
        window.localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  }, []);

  // Sync the theme with the <html> element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
    html.dataset.theme = 'dark';
    //   html.classList.add("dark");
    } else {
    html.dataset.theme = 'light';
    //   html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
}