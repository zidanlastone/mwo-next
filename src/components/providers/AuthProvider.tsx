"use client"

import { Session } from 'next-auth';
import { SessionProvider} from 'next-auth/react'
import React from 'react'

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

const AuthProvider = (props: ProvidersProps) => {
  return (
    <SessionProvider {...props}>
      {props.children}
    </SessionProvider>
  )
}

export default AuthProvider