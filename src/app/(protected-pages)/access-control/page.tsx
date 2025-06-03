"use client"
import Card from '@/components/template/card'
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React from 'react'

function Dashboard() {  
  const {data: session} = useSession();
  const {data: result, isLoading: loading, error} = useFetch('http://localhost:3000/access-control');
  
  return (
    <div>
        <Card title="Access Control">
            <p>this is access {session?.user.name}</p>
        </Card>
    </div>
  )
}

export default Dashboard