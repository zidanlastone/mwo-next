"use client"
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React from 'react'

type Vendors = {
  id: string,
  company_id: number,
  name: string,
  contact_info: string,
  created_at: string,
}

function Vendors() {

  const { data: result, isLoading: loading, error } = useFetch<Vendors[]>('http://localhost:3000/vendors');
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
                <Th>Company ID</Th>
                <Th>Name</Th>
                <Th>Contact Info</Th>
                <Th>Created At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{item.id}</Td>
                  <Td>{item.company_id}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.contact_info}</Td>
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

export default Vendors