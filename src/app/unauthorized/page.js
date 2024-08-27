// app/unauthorized/page.js

"use client";

import Link from 'next/link';

export default function Unauthorized() {
    return (
        <div className="flex items-center justify-center h-screen px-2">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-bold">Accès refusé</h1>
                <p className="text-lg">Vous n&apos;êtes pas autorisé à accéder à cette page.</p>
                <Link
                    href={'/'}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 text-center"
                >
                    Retour à l&apos;accueil
                </Link>
            </div>
        </div>
    );
}
