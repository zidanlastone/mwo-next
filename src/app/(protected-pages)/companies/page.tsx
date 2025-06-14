"use client"
import Card from '@/components/template/card'
import Modal from '@/components/template/modal';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import React, { useState } from 'react'
import Form from './_components/form';
import { Company } from '@/_types/company';
import RenderDate from '@/components/template/render-date';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import { useSWRConfig } from 'swr';


function Companies() {

  const fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/companies`;

  const { mutate } = useSWRConfig()
  const { data: result, isLoading: loading, error } = useFetch<Company[]>(fetch_url);
  const {THead, Tr, Th, Td, TBody} = Table

  const [showCreateDialog, setShowCreateDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: Company, show: boolean }>({ item: undefined, show: false });
  const [showUpdateDialog, setShowUpdateDialog] = useState<{ item?: Company, show: boolean }>({ item: undefined, show: false });
  

  return (
    <div>
      <Card title="Companies">
        <p>This page manage Company</p>

        <PrimaryButton className='my-2' onClick={() => setShowCreateDialog(true)}>Create Company Data</PrimaryButton>
        
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
                <Th>Description</Th>
                <Th>Parent Id</Th>
                <Th>Creted At</Th>
              </Tr>
            </THead>
            <TBody>
              {Array.isArray(result?.data) && result?.data.map((item, index) => (
                <Tr key={index.toString()}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.parent_id}</Td>
                  <Td><RenderDate date={item.created_at as Date}/></Td>
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