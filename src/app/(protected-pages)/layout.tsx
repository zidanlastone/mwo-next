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
        <div className="relative flex min-h-screen bg-white dark:bg-gray-900/10 font-sans">
            <Sidebar open={sidebarOpen} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <Navbar onSidebarToggle={() => setSidebarOpen((v) => !v)} sidebarOpen={sidebarOpen} />
                <main className="flex-1 p-6 rounded-t-xl bg-[var(--background)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;