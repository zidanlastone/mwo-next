import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';

export type ComboBoxData = {
  id: number,
  value: string
}

type ComboBoxProps = {
  data: ComboBoxData[],
  onChange: (x: ComboBoxData) => void,
  value: ComboBoxData | null,
  id?: string
  name?: string
  className?: string,
  placeholder?: string
};

function ComboBoxInput({ data, value, onChange, placeholder, ...props }: ComboBoxProps) {
  const [query, setQuery] = useState('')

  const filteredData = query === '' ? data : data.filter((item) => {
    return item.value.toLowerCase().includes(query.toLowerCase());
  })

  return (
    <Combobox value={value} onChange={onChange} {...props}>
      {({ open }) => (
        <>
          <Combobox.Input
            as={Fragment}
            onChange={(event: any) => setQuery(event.target.value)}
            displayValue={(item: ComboBoxData) => item !== null ? item.value : ''}
          >
            <input type="text" className="w-full rounded" placeholder={placeholder ? placeholder : 'Harap pilih data...'} />
          </Combobox.Input>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Combobox.Options static>
              {filteredData.map((item: ComboBoxData) => (
                <Combobox.Option key={item.id} value={item} className="w-full p-2 bg-white hover:bg-gray-300 rounded border-b-2">
                  {item.value}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </>
      )}
    </Combobox>
  )
}

export default ComboBoxInput