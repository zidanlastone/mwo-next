"use client"
import { Project } from '@/_types/project';
import Card from '@/components/template/card'
import Calendar from '@/components/template/DatePicker/Calendar';
import RenderDate from '@/components/template/render-date';
import Table from '@/components/template/table';
import useFetch from '@/utils/hooks/use-fetch';
import { ClipboardDocumentCheckIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr';

function Dashboard() {

  const router = useRouter();
  const { THead, Tr, Th, Td, TBody } = Table
  const { data: session, update: updateSession } = useSession();

  const fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects`

  const { data: result, isLoading: loading, error } = useFetch<Project[]>(fetch_url);

  const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().toDate())

  const [metrics, setMetrics] = useState({
    ongoing: 0,
    upcoming: 0,
    completed: 0
  });

  const { mutate } = useSWRConfig();
  useEffect(() => {
    mutate(fetch_url)
  }, [session?.user.company?.company_id])

  useEffect(() => {

    const calcMetrics = () => {
      if (Array.isArray(result?.data)) {
        let ongoing = result.data.filter(x => x.status == 'in_progress').length
        let upcoming = result.data.filter(x => x.status == 'planning').length
        let completed = result.data.filter(x => x.status == 'completed').length

        setMetrics({
          ongoing,
          upcoming,
          completed
        })
      }
    }

    calcMetrics();

  }, [result?.status])

  return (
    <div>
      <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Dasboard "Under Development"</h3>
      <p className="text-md text-gray-700 dark:text-gray-100 font-bold mb-4">{session?.user.company?.company}</p>
      {/* left Section */}
      <div className="flex flex-row gap-2 min-w-full">
        <div className="min-w-3/4">
          <Card className="min-w-full">
            <h4 className="py-4 text-2xl font-semibold">Overview</h4>
            <div className="grid grid-cols-3 gap-2">
              <Card className="bg-amber-200">
                <h4 className="my-2">Ongoing Project</h4>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-2xl">
                    <ClipboardDocumentListIcon />
                  </div>
                  <p className='text-2xl font-bold'>{metrics.ongoing}</p>
                </div>
              </Card>
              <Card className="bg-green-200">
                <h4 className="my-2">Completed Project</h4>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-2xl">
                    <ClipboardDocumentCheckIcon />
                  </div>
                  <p className='text-2xl font-bold'>{metrics.completed}</p>
                </div>
              </Card>
              <Card className="bg-blue-200">
                <h4 className="my-2">Upcoming Project</h4>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 rounded-full text-2xl">
                    <ClipboardDocumentListIcon />
                  </div>
                  <p className='text-2xl font-bold'>{metrics.upcoming}</p>
                </div>
              </Card>
            </div>
          </Card>

          <Card title="This page manage projects" className='my-2'>
            {/* <Link href="/projects/create" className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">Create Project</Link> */}
            {loading && <div className="py-4">Loading data...</div>}
            {error && <div className="py-4 text-red-500">{error}</div>}
            {!loading && result?.message && <div className={`py-4 ${result.status == "200 OK" ? "text-green-500" : "text-red-500"} `}>{result.message}</div>}
            {!loading && !error && (
              <Table hoverable={true}>
                <THead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Company Id</Th>
                    <Th>Project Name</Th>
                    <Th>Customer</Th>
                    <Th>Total Cost</Th>
                    <Th>Status</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th>Created At</Th>
                  </Tr>
                </THead>
                <TBody>
                  {Array.isArray(result?.data) && result?.data.map((item, index) => (
                    <Tr key={index.toString()} onClick={(e) => {
                      e.preventDefault()
                      router.push(`/projects/${item.id}`)
                    }}>
                      <Td>{index + 1}</Td>
                      <Td>{item.company}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.customer}</Td>
                      <Td>{item.total_cost}</Td>
                      <Td>{item.status}</Td>
                      <Td><RenderDate date={new Date(item.start_date)} /></Td>
                      <Td>{item.end_date && (<RenderDate date={new Date(item.end_date as string)} />)}</Td>
                      <Td><RenderDate date={new Date(item.created_at)} /></Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            )}
          </Card>

        </div>
        {/* End Left Section */}
        {/* Right Section */}
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
        {/* End Right Section */}
      </div>
    </div>
  )
}

export default Dashboard