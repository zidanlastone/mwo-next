

import { Company } from '@/_types/company';
import { Vendor, vendorSchema } from '@/_types/vendor';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import InputError from '@/components/template/inputs/InputError';
import InputLabel from '@/components/template/inputs/InputLabel';
import TextInputx from '@/components/template/inputs/TextInputx';
import useFetch from '@/utils/hooks/use-fetch';
import useSubmit from '@/utils/hooks/use-submit';
import { Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';


const Select = React.forwardRef<HTMLSelectElement, { label: string, options: Company[] } & ReturnType<UseFormRegister<Vendor>>>(({ onChange, onBlur, name, label, options }, ref) => (
  <>
    <InputLabel htmlFor="select-company" value={label} />
    <select id="select-company" name={name} ref={ref} onChange={onChange} onBlur={onBlur} 
        className="block w-full rounded-md border-0 py-2 text-gray-700 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
        <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> -- Select Data -- </option>
        {options.map(item => (
        <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200' value={item.id as number}>{item.name}</option>
        ))}
    </select>
  </>
))

function Form({ onComplete, className, item, mode = 'create', title }: { onComplete?: () => void, className?: string, item?: Vendor, mode?: 'create' | 'update', title: string }) {

    const { data: session, update: updateSession } = useSession();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Vendor>({
        resolver: zodResolver(vendorSchema)
    })

    let fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/vendors`

    let fetch_company_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/companies`;

    const { data: resultCompanies, isLoading: loadingCompanies, error:errorCompanies } = useFetch<Company[]>(fetch_company_url);

    const { submitRequest, recentlySuccessful, processing } = useSubmit<Vendor, Vendor>(fetch_url);

    const submit: SubmitHandler<Vendor> = (payload) => {
        console.log(payload)
        if (mode == 'create') {
            submitRequest({
                ...payload,
                company_id: session?.user.company?.company_id
            }, 'POST')
        } else if (mode == 'update' && item != undefined) {
            submitRequest({
                ...payload,
                company_id: session?.user.company?.company_id  
            }, 'PUT', `${fetch_url}/${item.id}`)
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

                {/* <div>
                    <Select options={Array.isArray(resultCompanies?.data) ? resultCompanies?.data : []} label={'Company'} {...register("company_id", {valueAsNumber: true})} />
                    <InputError message={errors.company_id?.message} className="mt-2" />
                </div> */}

                <div>
                    <InputLabel htmlFor="name" value="Nama Vendor" />
                    <TextInputx
                        id="name"
                        className="my-2 block w-full"
                        autoComplete="company"
                        isFocused={true}
                        field='name'
                        register={register}
                        required
                    />
                    <InputError message={errors.name?.message} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="contact_info" value="Contact Info" />
                    <TextInputx
                        id="contact_info"
                        className="my-2 block w-full"
                        autoComplete="contact"
                        isFocused={true}
                        field='contact_info'
                        register={register}
                        required
                    />
                    <InputError message={errors.contact_info?.message} className="mt-2" />
                </div>

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

export default Form