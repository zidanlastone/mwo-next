"use client"

import { Company, companySchema } from '@/_types/company';
import { Procurement, ProcurementRow, procurementSchema } from '@/_types/procurement';
import { Vendor, VendorRow } from '@/_types/vendor';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import InputError from '@/components/template/inputs/InputError';
import InputLabel from '@/components/template/inputs/InputLabel';
import TextInput from '@/components/template/inputs/TextInput';
import TextInputx from '@/components/template/inputs/TextInputx';
import useFetch from '@/utils/hooks/use-fetch';
import useSubmit from '@/utils/hooks/use-submit';
import { Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';

const SelectVendor = React.forwardRef<HTMLSelectElement, { label: string, company_id?: number } & ReturnType<UseFormRegister<Procurement>>>(({ onChange, onBlur, name, label, company_id}, ref) => {

    let fetch_vendor_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/vendors?company_id=${company_id}`
    const { data: result, isLoading: loading, error } = useFetch<VendorRow[]>(fetch_vendor_url);

    {loading && <div className="py-4">Loading data...</div>}
    {error && <div className="py-4 text-red-500">{error}</div>}

    return (
        <>
            <InputLabel htmlFor="select-vendor" value={label} />
            <select id="select-vendor" name={name} ref={ref} onChange={onChange} onBlur={onBlur} disabled={company_id ? false: true }
                className="block w-full rounded-md border-0 py-2 text-gray-700 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> -- Select Data -- </option>
                {Array.isArray(result?.data) && result.data.map(item => (
                    <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' value={item.id as string}>{item.name}</option>
                ))}
            </select>
        </>
    )
})

const SelectCompany = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<Procurement>>>(({ onChange, onBlur, name, label }, ref) => {
    
    let fetch_company_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/companies`
    const { data: result, isLoading: loading, error } = useFetch<Company[]>(fetch_company_url);

    {loading && <div className="py-4">Loading data...</div>}
    {error && <div className="py-4 text-red-500">{error}</div>}

    return (
        <>
            <InputLabel htmlFor="select-company" value={label} />
            <select id="select-company" name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                className="block w-full rounded-md border-0 py-2 text-gray-700 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> -- Select Data -- </option>
                {Array.isArray(result?.data) && result.data.map(item => (
                    <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' value={item.id as number}>{item.name}</option>
                ))}
            </select>
        </>
    )
})

const SelectStatus = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<Procurement>>>(({ onChange, onBlur, name, label }, ref) => {
    let status = ['pending', 'approved', 'completed'];
    return (
        <>
            <InputLabel htmlFor="select-company" value={label} />
            <select id="select-company" name={name} ref={ref} onChange={onChange} onBlur={onBlur}
                className="block w-full rounded-md border-0 py-2 text-gray-700 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
                <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> -- Select Data -- </option>
                {Array.isArray(status) && status.map(item => (
                    <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' value={item}>{item}</option>
                ))}
            </select>
        </>
    )
})

function FormItem({ onComplete, className, item, mode = 'create', title = '', id }: { onComplete?: () => void, className?: string, item?: ProcurementRow, mode?: 'create' | 'update', title: string, id: string }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(procurementSchema)
    })

    let fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/procurements/${id}/items`

    const { submitRequest, recentlySuccessful, processing } = useSubmit<Procurement, Procurement>(fetch_url);

    const submit: SubmitHandler<Procurement> = (payload) => {
        if (mode == 'create') {
            submitRequest(payload, 'POST')
        } else if (mode == 'update' && item != undefined) {
            submitRequest(payload, 'PUT', `${fetch_url}/${item.id}`)
        }
    };

    useEffect(() => {
        if (recentlySuccessful) {
            if (typeof onComplete == 'function') {
                setTimeout(onComplete, 2000);
            }
        }
    }, [recentlySuccessful])

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">{title}</h2>
            </header>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">

                <div className="flex items-center justify-end mt-4">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 mr-2">Saved.</p>
                    </Transition>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {mode == 'create' ? 'Create Data' : 'Update Data'}
                    </PrimaryButton>
                </div>
            </form>
        </section>
    )
}

export default FormItem