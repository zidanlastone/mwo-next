"use client"

import { Company, companySchema } from '@/_types/company';
import PrimaryButton from '@/components/template/buttons/PrimaryButton';
import InputError from '@/components/template/inputs/InputError';
import InputLabel from '@/components/template/inputs/InputLabel';
import TextInput from '@/components/template/inputs/TextInput';
import TextInputx from '@/components/template/inputs/TextInputx';
import useSubmit from '@/utils/hooks/use-submit';
import { Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function Form({ onComplete, className, item, mode = 'create', title = ''}: { onComplete?: () => void, className?: string, item?: Company, mode?: 'create' | 'update', title: string }) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(companySchema)
    })

    let fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/companies`

    const { submitRequest, recentlySuccessful, processing } = useSubmit<Company, Company>(fetch_url);

    const submit: SubmitHandler<Company> = (payload) => {
        console.log(payload)
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
                <div>
                    <InputLabel htmlFor="name" value="Company Name" />
                    <TextInputx
                        id="name"
                        className="my-2 block w-full"
                        autoComplete="company"
                        isFocused={true}
                        field="name"
                        register={register}
                        required
                    />
                    <InputError message={errors.name?.message} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInputx
                        id="description"
                        className="my-2 block w-full"
                        autoComplete="description"
                        isFocused={true}
                        field="description"
                        register={register}
                    />
                    <InputError message={errors.description?.message} className="mt-2" />
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