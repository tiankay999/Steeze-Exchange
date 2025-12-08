"use client";
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex h-screen w-full bg-gray-50">
            <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header onMenuClick={toggleMobileMenu} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}