"use client"
import { ProcurementItem } from '@/_types/procurement';
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import React, { use } from 'react'



function Items({params}: {params: Promise<{id: string}>}) {

  const {id} = React.use(params);
  const { data: result, isLoading: loading, error } = useFetch<ProcurementItem[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/procurements/${id}/items`);
  const {THead, Tr, Th, Td, TBody} = Table

  return (
    <div>
      <Card title="Vendors">
        <p>This page manage vendors</p>
        <br />
        <hr />
        {loading && <div className="py-4">Loading data...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && result?.message && <div className={`py-4 ${result.status == "200 OK" ? "text-green-500" : "text-red-500"} `}>{result.message}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>No</Th>
                <Th>Product ID</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{index + 1}</Td>
                  <Td>{item.product}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.total_price}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  )
}

export default Items