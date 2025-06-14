"use client"
import { ProcurementItem } from '@/_types/procurement';
import { ProjectMilestone } from '@/_types/project';
import Card from '@/components/template/card'
import RenderDate from '@/components/template/render-date';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { useSession } from 'next-auth/react';
import React, { use } from 'react'



function Items({params}: {params: Promise<{id: string}>}) {

  const {data: session, update: updateSession} = useSession();

  const {id} = React.use(params);
  const { data: result, isLoading: loading, error } = useFetch<ProjectMilestone[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects/${id}/milestones`);
  const {THead, Tr, Th, Td, TBody} = Table

  return (
    <div>
      <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Milestones "Under Development"</h3>
      <p className="text-md text-gray-700 dark:text-gray-100 font-bold mb-4">{session?.user.company?.company}</p>
        {/* left Section */}
      <div className="flex flex-row gap-2 min-w-full">
        <div className="min-w-3/4">
          <Card>
            <p>This page manage Milestones</p>
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
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Status</Th>
                    <Th>Due Date</Th>
                  </Tr>
                </THead>
                <TBody>
                  {Array.isArray(result?.data) && result?.data.map((item, index) => (
                    <Tr key={index.toString()}>
                      <Td>{index + 1}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.description}</Td>
                      <Td>{item.status}</Td>
                      <Td><RenderDate date={new Date(item.due_date)} /></Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>
        </div>
        <div className="min-w-1/4"></div>

      </div>
    </div>
  )
}

export default Items