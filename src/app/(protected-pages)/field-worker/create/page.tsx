"use client"
import { Project, ProjectDTO, ProjectSchema } from '@/_types/project';
import Card from '@/components/template/card'
import Calendar from '@/components/template/DatePicker/Calendar';
import InputError from '@/components/template/inputs/InputError';
import InputLabel from '@/components/template/inputs/InputLabel';
import TextInputx from '@/components/template/inputs/TextInputx';
import RenderDate from '@/components/template/render-date';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';


// import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import CustomerForm from './_components/customer-form';
import { Customer, CustomerDTO } from '@/_types/customer';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import useSubmit from '@/utils/hooks/use-submit';
import ProjectForm from './_components/project-form';

function ProjectCreate() {
    let { data: session, update: updateSession } = useSession();

    const [selectedDate, setSelectedDate] = useState<Date | null>(dayjs().toDate())

    const [customerData, setCustomerData] = useState<CustomerDTO | null>()
    const [projectData, setProjectData] = useState<ProjectDTO | null>()

    const customerFormRef = useRef<HTMLButtonElement>(null)
    const projectFormRef = useRef<HTMLButtonElement>(null)

    let submit_customer_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/customers`
    const { submitRequest: submitCustomer, recentlySuccessful: submitCustomerSuccess} = useSubmit<Customer, CustomerDTO>(submit_customer_url);

    let submit_project_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/projects`
    const { submitRequest: submitProject, recentlySuccessful: submitProjectSuccess } = useSubmit<Project, ProjectDTO>(submit_project_url);

    const submitAllRequest = async () => {
        if (!customerData) return;
        if (!projectData) return;

        const customerResult = await submitCustomer(customerData, 'POST')
        const customer = customerResult.data as Customer
        
        if(customer && customerResult.status == '200 OK') {
            const projectResult = await submitProject({
                ...projectData,
                name: projectData.name as string, // ensure name is string
                status: projectData.status as string,
                customer_id: customer.id,
                start_date: projectData.start_date,
                end_date: projectData.end_date ? projectData.end_date : undefined,
            }, 'POST')
        
            console.log(projectResult.data)
        }
    }

    const submitAll = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(customerFormRef.current && projectFormRef.current){
            customerFormRef.current.click();
            projectFormRef.current.click();

            submitAllRequest();
        }
    }

    return (
        <div>
            <h3 className="text-2xl text-gray-700 dark:text-gray-100 font-bold">Create Projects</h3>
            <p className="text-md text-gray-700 dark:text-gray-100 font-bold mb-4">{session?.user.company?.company}</p>
            {/* left Section */}
            <div className="flex flex-row gap-2 min-w-full">
                <div className="min-w-3/4">
                    <Card>
                        <CustomerForm company_id={session?.user.company?.company_id as number} onSubmitData={setCustomerData} ref={customerFormRef} />

                        <hr className="my-4" />

                        <ProjectForm company_id={session?.user.company?.company_id as number} onSubmitData={setProjectData} ref={projectFormRef} />
                    </Card>

                    <PrimaryButton type="button" onClick={submitAll}>submit</PrimaryButton>
                </div>
                {/* End Left Section */}
                {/* Right Section */}
                <div className="flex mx-auto w-3/4">
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

export default ProjectCreate