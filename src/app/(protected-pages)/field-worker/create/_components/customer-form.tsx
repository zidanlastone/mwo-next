import {CustomerDTO, CustomerDTOSchema } from '@/_types/customer'
import InputError from '@/components/template/inputs/InputError'
import InputLabel from '@/components/template/inputs/InputLabel'
import TextInputx from '@/components/template/inputs/TextInputx'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useImperativeHandle, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'



const CustomerForm = ({ company_id, onSubmitData, ...props}: { company_id: number, onSubmitData: (values: CustomerDTO) => void}, ref: React.Ref<HTMLButtonElement> | undefined) => {
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CustomerDTOSchema)
    })

    const submitForm: SubmitHandler<CustomerDTO> = (values) => {
        onSubmitData({
            ...values,
            company_id
        })
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} {...props}>
            <h1>Customer</h1>
            <div>
                <InputLabel htmlFor="name" value="Name" />
                <TextInputx
                    id="name"
                    className="my-2 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    field="name"
                    register={register}
                    required
                />
                <InputError message={errors.name?.message} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="phone" value="Phone" />
                <TextInputx
                    id="phone"
                    className="my-2 block w-full"
                    autoComplete="tel"
                    field="phone"
                    register={register}
                    required
                />
                <InputError message={errors.phone?.message} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="address" value="Address" />
                <TextInputx
                    id="address"
                    className="my-2 block w-full"
                    autoComplete="street-address"
                    field="address"
                    register={register}
                    required
                />
                <InputError message={errors.address?.message} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="description" value="description" />
                <TextInputx
                    id="description"
                    className="my-2 block w-full"
                    autoComplete="street-address"
                    field="description"
                    register={register}
                    required
                />
                <InputError message={errors.description?.message} className="mt-2" />
            </div>

            <button type="submit" className="hidden" ref={ref}>Submit</button>
        </form>
    )
}

export default React.forwardRef<HTMLButtonElement, { company_id: number, onSubmitData: (values: CustomerDTO) => void}>(CustomerForm)