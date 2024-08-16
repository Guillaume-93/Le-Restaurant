// pages/unauthorized.js

import { signOut } from 'next-auth/react';

export default function Unauthorized() {
    return (
        <div className="flex items-center justify-center h-screen px-2">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-3xl font-bold">Accès refusé</h1>
                <p className="text-lg">Vous n'êtes pas autorisé à accéder à cette page.</p>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700"
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
}
