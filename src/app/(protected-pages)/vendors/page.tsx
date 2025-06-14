"use client"
import Card from '@/components/template/card'
import Modal from '@/components/template/modal';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Form from './_components/form';
import { useSWRConfig } from 'swr';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import { Company } from '@/_types/company';
import { Vendor, VendorRow } from '@/_types/vendor';
import RenderDate from '@/components/template/render-date';


function Vendors() {
  let {data: session, update: updateSession} = useSession();

  let fetch_vendor_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/vendors`
  const {mutate} = useSWRConfig();
  const { data: result, isLoading: loading, error } = useFetch<VendorRow[]>(fetch_vendor_url);
  const {THead, Tr, Th, Td, TBody} = Table


  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: Vendor, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: Vendor, show: boolean }>({ item: undefined, show: false });

  
  useEffect(() => {
    mutate(fetch_vendor_url)
  }, [session?.user.company?.company_id])

  return (
    <div>
      <Card title="Vendors">
        <p>This page manage vendors</p>
        <PrimaryButton className='my-2' onClick={() => setShowCreateDialog(true)}>Create Vendor Data</PrimaryButton>
        <br />
        <hr />
        {loading && <div className="py-4">Loading data...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>No</Th>
                <Th>Company</Th>
                <Th>Name</Th>
                <Th>Contact Info</Th>
                <Th>Created At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{index + 1}</Td>
                  <Td>{item.company}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.contact_info}</Td>
                  <Td><RenderDate date={item.created_at as Date}/></Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Card>

      <Modal show={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <Form mode="create"
          title='Create Vendor Data'
          className="p-4 sm:p-8 bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg"
          onComplete={() => {
            setShowCreateDialog(false)
            mutate(fetch_vendor_url)
          }} />
      </Modal>
    </div>
  )
}

export default Vendors