// src/components/admin/AdminLayout.js
"use client";

import AdminHeader from './AdminHeader';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/Loader';

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();

    if (status === "loading") return <Loader />;
    if (status === 'unauthenticated') return null;

    return (
        <div className="min-h-full flex flex-col">
            <AdminHeader session={session} />
            <div className="flex-grow">
                <div className="bg-gray-50 py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
