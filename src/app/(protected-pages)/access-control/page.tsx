"use client"
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React from 'react'
import { array } from 'zod/v4';

type AccesControll = {
  id: number,
  ptype: string,
  v0: string,
  v1: string,
  v2: string,
  v3: string,
  v4: string,
  v5: string,
}

function Dashboard() {
  const { data: session } = useSession();
  const { data: result, isLoading: loading, error } = useFetch<AccesControll[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/access-control`);

  const {THead, Tr, Th, Td, TBody} = Table

  return (
    <div>
      <Card title="Access Control">
        <p>This page manage the access control that every role has</p>
        <br />
        <hr />
        {loading && <div className="py-4">Loading data...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>ID</Th>
                <Th>Ptype</Th>
                <Th>V0</Th>
                <Th>V1</Th>
                <Th>V2</Th>
                <Th>V3</Th>
                <Th>V4</Th>
                <Th>V5</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{item.id}</Td>
                  <Td>{item.ptype}</Td>
                  <Td>{item.v0}</Td>
                  <Td>{item.v1}</Td>
                  <Td>{item.v2}</Td>
                  <Td>{item.v3}</Td>
                  <Td>{item.v4}</Td>
                  <Td>{item.v5}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

export default Dashboard