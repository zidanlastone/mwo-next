import React, { useEffect, useState } from 'react';
import { HomeIcon, UserIcon, ChartBarIcon, UsersIcon, ShieldCheckIcon, Cog6ToothIcon, BriefcaseIcon, ChevronDownIcon, ChevronLeftIcon, BuildingOffice2Icon, CubeIcon, CalendarDaysIcon, ClipboardDocumentListIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel, Field, Label, Select } from '@headlessui/react';
import { UserCompanyRow } from '@/_types/company';
import useFetch from '@/utils/hooks/use-fetch';
import clsx from 'clsx'
import { useSession } from 'next-auth/react';


const menuItems = [
    { title: 'Analytics', icon: ChartBarIcon, route: "/dashboard" },
    { title: 'Projects', icon: ClipboardDocumentListIcon, route: "/projects" },
    { title: 'Customers', icon: UsersIcon, route: "/customers" },
    { title: 'Procurement', icon: CubeIcon, route: "/procurement" },
    { title: 'Services', icon: BriefcaseIcon, route: "/services" },
    { title: 'Scheduling', icon: CalendarDaysIcon, route: "/scheduling" },
    { title: 'Field Worker', icon: UserIcon, route: "/field-worker" },
    {
        title: 'Management', icon: Cog6ToothIcon, route: "#", menu: [
            { title: 'Users', icon: UsersIcon, route: "/users" },
            { title: 'Access Control', icon: ShieldCheckIcon, route: "/access-control" },
        ]
    },
    { title: 'Vendors', icon: UserIcon, route: "/vendors" },
    { title: 'Companies', icon: BuildingOffice2Icon, route: "/companies" },
];


const SelectCompany = () => {
    const { data: session, update: updateSession } = useSession();
    const fetch_url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user-companies`;
    const { data: result, isLoading: loading, error } = useFetch<UserCompanyRow[]>(fetch_url);

    const [selectedCompanyId, setSelectedCompanyID] = useState<number>(session?.user?.company?.company_id as number ?? 0);
    const [selectedCompany, setSelectedCompany] = useState<UserCompanyRow>();

    useEffect(() => {
        if (Array.isArray(result?.data) && result?.data.length > 0) {
            if(session?.user.company){
                setSelectedCompany(session.user.company)
                setSelectedCompanyID(session.user.company.company_id)
            } else {
                let rs = result?.data[0];
                setSelectedCompany(rs)
                updateSession({...session, company: rs})
                setSelectedCompanyID(rs.company_id)
            }
        }
    }, [])

    useEffect(() => {
        const updateCompanySession = async () => {
            if(selectedCompanyId != 0){
                await updateSession({...session, user: {...session?.user, company: selectedCompany}})                            
            }
        }
        updateCompanySession();
    }, [selectedCompanyId])

    return (
        <Field className="my-2 w-full">
            <div className="relative ">
                <div>
                    <Select
                        // defaultValue={selectedCompanyId}
                        value={selectedCompanyId}
                        onChange={(e) => {
                            if(Array.isArray(result?.data)){
                                let find = result?.data.find(x => x.company_id as number == parseInt(e.target.value));
                                setSelectedCompany(find)
                            }
                            setSelectedCompanyID(parseInt(e.target.value))
                        }}
                        className={clsx(
                            'block w-full appearance-none rounded-lg border-none bg-gray-300/50 dark:bg-gray-700 px-3 py-2 text-sm/6 dark:text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                            'py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition',
                            'text-lg font-semibold',
                        )}>
                        <option value={0}> -- Select Data -- </option>
                        {Array.isArray(result?.data) && result?.data.map((item, index) => (
                            <option value={item.company_id} key={index} className='text-lg font-bold flex flex-row'>
                            {item.company.split(" ")[0]} {item.company.split(" ")[1]} {item.company.split(" ")[2]}
                            </option>
                        ))}
                    </Select>

                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60 text-gray-800 dark:text-gray-100"
                        aria-hidden="true"
                    />
                </div>
            </div>
        </Field>
    )
}

const Sidebar = ({ open }: { open: boolean }) => (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
            <div className="flex items-center mb-2 mt-8">
                <div>
                    <span className="text-md md:text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</span>
                </div>
            </div>
            <div className="mb-2">
                <SelectCompany />
            </div>
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) =>
                    item.menu ? (
                        <div key={item.title} className="space-y-1">
                            <Disclosure as="div">
                                {({ open }) => (
                                    <React.Fragment>
                                        <DisclosureButton
                                            className={`flex font-bold items-center gap-3 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition w-full`}>
                                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                                            <span className="text-sm md:text-base flex-1 text-left">{item.title}</span>
                                            <ChevronLeftIcon className={`w-4 h-4 transition-transform ${open ? '-rotate-90' : ''}`} />
                                        </DisclosureButton>
                                        <div className='overflow-hidden'>
                                            <DisclosurePanel transition className={`pl-8 origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0`}>
                                                {item.menu.map((sub) => (
                                                    <a
                                                        key={sub.title}
                                                        href={sub.route}
                                                        className="flex items-center gap-2 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold"
                                                    >
                                                        <sub.icon className="w-5 h-5" />
                                                        <span>{sub.title}</span>
                                                    </a>
                                                ))}
                                            </DisclosurePanel>
                                        </div>

                                    </React.Fragment>
                                )}
                            </Disclosure>
                        </div>
                    ) : (
                        <a
                            key={item.title}
                            href={item.route}
                            className="flex font-bold items-center gap-3 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="text-sm md:text-base">{item.title}</span>
                        </a>
                    )
                )}
            </nav>
        </div>
    </aside>
);

export default Sidebar;
