import React from 'react';
import { HomeIcon, UserIcon, ChartBarIcon, UsersIcon, ShieldCheckIcon, Cog6ToothIcon, BriefcaseIcon, ChevronDownIcon, ChevronLeftIcon, BuildingOffice2Icon, CubeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';



const menuItems = [
    { title: 'Analytics', icon: ChartBarIcon, route: "/dashboard" },

    { title: 'Procurement', icon: CubeIcon, route: "/procurement" },
    { title: 'Services', icon: BriefcaseIcon, route: "/services" },
    { title: 'Vendors', icon: UserIcon, route: "/vendors" },
    { title: 'Scheduling', icon: CalendarDaysIcon, route: "/scheduling" },
    { title: 'Field Worker', icon: UserIcon, route: "/field-worker" },
    {
        title: 'Management', icon: Cog6ToothIcon, route: "#", menu: [
            { title: 'Users', icon: UsersIcon, route: "/users" },
            { title: 'Access Control', icon: ShieldCheckIcon, route: "/access-control" },
        ]
    },
    { title: 'Companies', icon: BuildingOffice2Icon, route: "/companies" },
];

const Sidebar = ({ open }: { open: boolean }) => (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
            <div className="flex items-center mb-8 mt-8">
                <span className="text-md md:text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</span>
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
