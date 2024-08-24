// app/auth/login/page.js

"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md gap-y-4">
                <img className='sm:h-32 w-auto' src="/images/logos/le-neuilly-canva.png" alt="Le Neuilly Logo" />
                <p className="text-lg text-center">Connectez-vous pour continuer</p>
                <button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
                >
                    Se connecter avec Google
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow hover:bg-gray-400"
                >
                    Retour
                </button>
            </div>
        </div>
    );
}
