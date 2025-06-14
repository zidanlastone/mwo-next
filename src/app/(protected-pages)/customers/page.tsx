"use client"
import Card from '@/components/template/card'
import Modal from '@/components/template/modal';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import React, { useEffect, useState } from 'react'
import Form from './_components/form';
import { Company } from '@/_types/company';
import RenderDate from '@/components/template/render-date';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { Customer } from '@/_types/customer';


function Companies() {

  let {data: session, update: updateSession} = useSession();

  const fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`;

  const { mutate } = useSWRConfig()
  const { data: result, isLoading: loading, error } = useFetch<Customer[]>(fetch_url);
  const {THead, Tr, Th, Td, TBody} = Table

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: Customer, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: Customer, show: boolean }>({ item: undefined, show: false });

  useEffect(() => {
    mutate(fetch_url)
  }, [session?.user.company?.company_id])
  
  return (
    <div>
      <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Customers</h3>
      <p className="text-md text-gray-700 dark:text-gray-100 font-bold mb-4">{session?.user.company?.company}</p>
      <Card title="Customers">
        <p>This page manage customes</p>
        
        <br />
        <hr />
        {loading && <div className="py-4">Loading data...</div>}
        {error && <div className="py-4 text-red-500">{error}</div>}
        {!loading && !error && (
          <Table hoverable={true}>
            <THead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Phone</Th>
                <Th>Description</Th>
                <Th>Address</Th>
                <Th>Creted At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.phone}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.address}</Td>
                  <Td><RenderDate date={new Date(item.created_at)}/></Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </Card>

      <Modal  show={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
          <Form 
            className="p-4 sm:p-8 shadow sm:rounded-lg bg-white/70 dark:bg-gray-900/80 text-gray-900 dark:text-gray-100"
            title='Create Company Data'
            onComplete={() => {
              setShowCreateDialog(false)
              mutate(fetch_url)
            }} />
      </Modal>
    </div>
  )
}

export default Companies