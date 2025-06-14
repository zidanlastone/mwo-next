"use client"
import { Procurement, ProcurementRow } from '@/_types/procurement';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import Card from '@/components/template/card'
import Modal from '@/components/template/modal';
import RenderDate from '@/components/template/render-date';
import Table from '@/components/template/table';
import { formatDate } from '@/utils/helpers/date.helper';
import useFetch from '@/utils/hooks/use-fetch';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Form from './_components/form';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import Calendar from '@/components/template/DatePicker/Calendar';
import dayjs from 'dayjs';

function Procurements() {

  const router = useRouter();
  let { data: session, update: updateSession } = useSession();
  const fetch_procurement_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/procurements`

  const { mutate } = useSWRConfig();
  const { data: result, isLoading: loading, error } = useFetch<ProcurementRow[]>(fetch_procurement_url);
  const { THead, Tr, Th, Td, TBody } = Table

  const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().toDate())
  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: ProcurementRow, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: ProcurementRow, show: boolean }>({ item: undefined, show: false });


  useEffect(() => {
    mutate(fetch_procurement_url)
  }, [session?.user.company?.company_id])

  return (
    <div>
      <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Procurements</h3>
      <p className="text-md text-gray-700 dark:text-gray-100 font-bold mb-4">{session?.user.company?.company}</p>
      <div className="flex flex-row gap-2 min-w-full">
        <div className="min-w-3/4">
          {/* left Section */}
          <Card title="Procurement">
            <p>This page manage Procurement</p>
            <PrimaryButton className='my-2' onClick={() => setShowCreateDialog(true)}>Create Procurement Data</PrimaryButton>
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
                    <Th>Company</Th>
                    <Th>Name</Th>
                    <Th>Vendor</Th>
                    <Th>Status</Th>
                    <Th>Created At</Th>
                  </Tr>
                </THead>
                <TBody>
                  {Array.isArray(result?.data) && result?.data.map((item, index) => (
                    <Tr key={index.toString()} onClick={(e) => {
                      e.preventDefault()
                      router.push(`/procurement/${item.id}`)
                    }}>
                      <Td>{index + 1}</Td>
                      <Td>{item.company}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.vendor}</Td>
                      <Td>{item.status}</Td>
                      <Td><RenderDate date={item.created_at} /></Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        </div>
        <div className="flex mx-auto w-3/4 h-fit">
          <Card>
              <Calendar
                  value={selectedDate}
                  onChange={(val) => {
                      setSelectedDate(val)
                  }}
              />
          </Card>
        </div>
      </div>

      <Modal show={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <Form mode="create"
          title='Create Procurement Data'
          className="p-4 sm:p-8 bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg"
          onComplete={() => {
            setShowCreateDialog(false)
            mutate(fetch_procurement_url)
          }} />
      </Modal>
    </div>
  )
}

export default Procurements