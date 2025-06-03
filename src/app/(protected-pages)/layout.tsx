'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import Navbar from '@/components/dashboard/navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 768; // open by default on desktop
        }
        return true;
    });

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        // Initial check
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative flex min-h-screen bg-white dark:bg-gray-900 font-sans">
            <Sidebar open={sidebarOpen} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <Navbar onSidebarToggle={() => setSidebarOpen((v) => !v)} sidebarOpen={sidebarOpen} />
                <main className="relative isolate flex-1 p-6 rounded-t-xl bg-gray-200 dark:bg-gray-700/25">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                        />
                    </div>
                    <div className="z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;