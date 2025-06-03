"use client"
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React from 'react'
import { array } from 'zod/v4';

type Company = {
  id: string,
  name: string,
  description: string,
  parent_id: string,
  created_at: string,
}

function Companies() {

  const { data: result, isLoading: loading, error } = useFetch<Company[]>('http://localhost:3000/companies');
  const {THead, Tr, Th, Td, TBody} = Table

  return (
    <div>
      <Card title="Vendors">
        <p>This page manage vendors</p>
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
                <Th>Description</Th>
                <Th>Parent Id</Th>
                <Th>Creted At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.parent_id}</Td>
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

export default Companies