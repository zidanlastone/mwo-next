"use client"
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react'
import React from 'react'

type Procurement = {
  id: string,
  company_id: string,
  vendor_id: string,
  status: string,
  created_at: string,
  updated_at: string,
}

function Procurements() {

  const router = useRouter();

  const { data: result, isLoading: loading, error } = useFetch<Procurement[]>('http://localhost:3000/procurements');
  const {THead, Tr, Th, Td, TBody} = Table

  return (
    <div>
      <Card title="Vendors">
        <p>This page manage vendors</p>
        <br />
        <hr />
        {loading && <div className="py-4">Loading users...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && result?.message && <div className={`py-4 ${result.status == "200 OK" ? "text-green-500" : "text-red-500"} `}>{result.message}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>ID</Th>
                <Th>Company Id</Th>
                <Th>Vendor ID</Th>
                <Th>Status</Th>
                <Th>Creted At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()} onClick={(e) => {
                  e.preventDefault()
                  router.push(`/procurement/${item.id}`)
                }}>
                  <Td>{item.id}</Td>
                  <Td>{item.company_id}</Td>
                  <Td>{item.vendor_id}</Td>
                  <Td>{item.status}</Td>
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

export default Procurements