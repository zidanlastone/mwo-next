"use client"

import { Session } from 'next-auth';
import { SessionProvider} from 'next-auth/react'
import React, { useEffect, useState } from 'react'

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

const AuthProvider = (props: ProvidersProps) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <SessionProvider {...props}>
      {props.children}
    </SessionProvider>
  )
}

export default AuthProvider