import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        // Déconnexion de l'utilisateur
        signOut({ callbackUrl: '/unauthorized' });
    }, [router]);

    return <div>Déconnexion en cours...</div>;
}
