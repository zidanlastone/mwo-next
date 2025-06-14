import React, { InputHTMLAttributes } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';


type PropsWithFieldValues<T extends FieldValues> = {
    register: UseFormRegister<T>;
    field: Path<T>;
    isFocused?: boolean;
};

type NewTextInput<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & PropsWithFieldValues<T>

const TextInputx = <T extends FieldValues>({ register, field, required, className, isFocused, type, ...props }: NewTextInput<T>) => {
    let valueAsNumber = type === 'number' ? true: false
    return (
        <input
            {...props}
            {...register(field, { required, valueAsNumber })}
            type={type}
            className={
                'className="block w-full rounded-md bg-white dark:bg-gray-700 px-3 py-1.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ' +
                className
            }
        />
    )
}

export default TextInputx