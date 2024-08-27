// src/components/admin/AdminSidebar.js
"use client";

import Link from 'next/link';

export default function AdminSidebar({ navigation, handleSectionChange }) {
    return (
        <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleSectionChange(item.section)}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                            item.current
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-900 hover:bg-slate-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
