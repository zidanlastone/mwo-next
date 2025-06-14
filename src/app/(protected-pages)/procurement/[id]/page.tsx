"use client"

import { ProcurementItem, ProcurementPayment } from '@/_types/procurement';
import Card from '@/components/template/card'
import RenderDate from '@/components/template/render-date';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import React, { use, useState } from 'react'
import FormItem from './_components/form-item';
import Modal from '@/components/template/modal';
import FormPayment from './_components/form-payment';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';

const { THead, Tr, Th, Td, TBody } = Table

const ProcurementItems = ({ id }: { id: string }) => {
  const { data: result, isLoading: loading, error } = useFetch<ProcurementItem[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/procurements/${id}/items`);

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: ProcurementItem, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: ProcurementItem, show: boolean }>({ item: undefined, show: false });

  return (
    <>
      <PrimaryButton className='my-2' onClick={() => setShowCreateDialog(true)}>Create Procurement Item Data</PrimaryButton>
      {loading && <div className="py-4">Loading data...</div>}
      {error && <div className="py-4 text-red-500">{error}</div>}
      {/* {!loading && result?.message && <div className={`py-4 ${result.status == "200 OK" ? "text-green-500" : "text-red-500"} `}>{result.message}</div>} */}
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
      <Modal show={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <FormItem id={id} mode="create"
          title='Create Procurement Data'
          className="p-4 sm:p-8 bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg"
          onComplete={() => {
            setShowCreateDialog(false)
            // mutate(fetch_procurement_url)
          }} />
      </Modal>
    </>
  )
}

const ProcurementPayments = ({ id }: { id: string }) => {
  const { data: result, isLoading: loading, error } = useFetch<ProcurementPayment[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/procurements/${id}/payments`);
  
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: ProcurementPayment, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: ProcurementPayment, show: boolean }>({ item: undefined, show: false });

  return (
    <>
      <PrimaryButton className='my-2' onClick={() => setShowCreateDialog(true)}>Create Procurement Payment Data</PrimaryButton>
      {loading && <div className="py-4">Loading data...</div>}
      {error && <div className="py-4 text-red-500">{error}</div>}
      {/* {!loading && result?.message && <div className={`py-4 ${result.status == "200 OK" ? "text-green-500" : "text-red-500"} `}>{result.message}</div>} */}
      {!loading && !error && (
        <Table hoverable={true}>
          <THead>
            <Tr>
              <Th>No</Th>
              <Th>Payment Type</Th>
              <Th>Total Amount</Th>
              <Th>Paid Amount</Th>
              <Th>Payment Status</Th>
              <Th>Payment Date</Th>
            </Tr>
          </THead>
          <TBody>
            {Array.isArray(result?.data) && result?.data.map((item, index) => (
              <Tr key={index.toString()}>
                <Td>{index + 1}</Td>
                <Td>{item.payment_type}</Td>
                <Td>{item.total_amount}</Td>
                <Td>{item.paid_amount}</Td>
                <Td>{item.payment_status}</Td>
                <Td><RenderDate date={item.payment_date as Date} /></Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      )}
      <Modal show={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <FormPayment mode="create"
          title='Create Procurement Data'
          className="p-4 sm:p-8 bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg"
          onComplete={() => {
            setShowCreateDialog(false)
            // mutate(fetch_procurement_url)
          }} />
      </Modal>
    </>
  )
}

function Items({ params }: { params: Promise<{ id: string }> }) {

  const { id } = React.use(params);


  return (
    <div>
      <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Detail Procurement</h3>
      <div className='flex flex-row gap-2 min-h-[70vh]'>
        <Card title="Procurement Items" className='my-2'>
          <ProcurementItems id={id} />
        </Card>
        <Card title="Procurements Payments" className='my-2'>
          <ProcurementPayments id={id} />
        </Card>
      </div>
    </div>
  )
}

export default Items