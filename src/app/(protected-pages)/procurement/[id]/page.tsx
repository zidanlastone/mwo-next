"use client"
import Card from '@/components/template/card'
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import React, { use } from 'react'

type ProcurementItem = {
  id: string,
  procurement_id: string,
  product_id: string,
  quantity: string,
  total_price: string,
}

function Items({params}: {params: Promise<{id: string}>}) {

  const {id} = React.use(params);
  const { data: result, isLoading: loading, error } = useFetch<ProcurementItem[]>(`http://localhost:3000/procurements/${id}/items`);
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
                <Th>Product ID</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{item.id}</Td>
                  <Td>{item.product_id}</Td>
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