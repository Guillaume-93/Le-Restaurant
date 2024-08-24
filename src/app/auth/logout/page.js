// app/auth/logout/page.js

// app/auth/logout/page.js

'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        signOut({ callbackUrl: '/' }).then(() => {
            router.push('/');
        });
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen px-2">
            <p>Déconnexion en cours...</p>
        </div>
    );
}
