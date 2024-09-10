import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/404/404-palmier.webp')" }}>
            {/* Conteneur principal avec espacement */}
            <div className="flex flex-col items-center justify-center p-4 lg:pl-24 space-y-6">
                <h1 className="text-7xl md:text-[8rem] xl:text-[14rem] font-bold text-gray-800 text-center w-full mb-64 sm:mb-0">404</h1>
                <p className="text-lg text-gray-900 max-w-sm text-center">
                    Il semble que vous avez saisi une URL incorrecte. La page que vous cherchez n'existe pas.
                </p>
                <Link href="/" className="text-black py-2 shadow-default bg-transparent hover:bg-white hover:bg-opacity-10 p-10 rounded-lg backdrop-blur-md ring-1 ring-black">
                    Retour à la page d'accueil
                </Link>
            </div>
        </div>
    );
}
