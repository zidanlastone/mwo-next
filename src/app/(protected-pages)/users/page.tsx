"use client"
import { auth } from '@/auth';
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const {THead, Tr, TBody, Th, Td} = Table;

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

function Users() {  
  // const ssn = await auth();
  const {data: session } = useSession();
  const {data: result, isLoading: loading, error} = useFetch<User[]>('http://localhost:3000/users')
  
  return (
    <div>
      <Card title="Users">
        <p>this is access {session?.user.name}</p>
        <br />
        <hr />
        {loading && <div className="py-4">Loading users...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Created At</Th>
              </Tr>
            </THead>
            <TBody>
              {result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.created_at}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

export default Users