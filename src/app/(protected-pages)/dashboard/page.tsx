"use client"
import Card from '@/components/template/card'
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React from 'react'

function Dashboard() {  
  let {data: session, status} = useSession();
  return (
    <div>
        <Card title="Dashboard">
            <p>this is dashboard {session?.user.name}</p>
        </Card>
    </div>
  )
}

export default Dashboard