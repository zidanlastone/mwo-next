
import { ProjectDTO, ProjectDTOSchema } from '@/_types/project'
import InputError from '@/components/template/inputs/InputError'
import InputLabel from '@/components/template/inputs/InputLabel'
import TextInputx from '@/components/template/inputs/TextInputx'
import { Field, Select } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'


const SelectStatus = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<ProjectDTO>>>(({ onChange, onBlur, name, label }, ref) => (
  <Field>
    <InputLabel htmlFor="select-status" value={label} />
    <Select id="select-status" name={name} ref={ref} onChange={onChange} onBlur={onBlur} 
        className="block w-full rounded-md border-0 py-2 text-gray-700 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6">
        <option className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> -- Select Status -- </option>
        <option value="planning" className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> Planning</option>
        <option value="in_progress" className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> In Progress </option>
        <option value="completed" className='py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'> Completed </option>
    </Select>
  </Field>
))


const ProjectForm = ({ company_id, onSubmitData, ...props}: { company_id: number, onSubmitData: (values: ProjectDTO) => void}, ref: React.Ref<HTMLButtonElement> | undefined) => {
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProjectDTOSchema)
    })

    const submitForm: SubmitHandler<ProjectDTO> = (values) => {
        onSubmitData({
            ...values,
            company_id,
        })
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} {...props}>
            <h1>Project</h1>
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
                <InputLabel htmlFor="total_cost" value="Total Cost" />
                <TextInputx
                    id="total_cost"
                    type="number"
                    className="my-2 block w-full"
                    autoComplete="total_cost"
                    isFocused={true}
                    field="total_cost"
                    register={register}
                    required
                />
                <InputError message={errors.total_cost?.message} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="start_date" value="Start Date" />
                <TextInputx
                    id="start_date"
                    className="my-2 block w-full"
                    type="datetime-local"
                    step={1}
                    autoComplete="start-date"
                    field="start_date"
                    register={register}
                />
                <InputError message={errors.start_date?.message} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="end_date" value="End Date" />
                <TextInputx
                    id="end_date"
                    className="my-2 block w-full"
                    type="datetime-local"
                    step={1}
                    autoComplete="end-date"
                    field="end_date"
                    register={register}
                />
                <InputError message={errors.end_date?.message} className="mt-2" />
            </div>

            <div>
                <SelectStatus label="Status" {...register('status')} />
            </div>
            

            <button type="submit" className="hidden" ref={ref}>Submit</button>
        </form>
    )
}

export default React.forwardRef<HTMLButtonElement, { company_id: number, onSubmitData: (values: ProjectDTO) => void}>(ProjectForm)