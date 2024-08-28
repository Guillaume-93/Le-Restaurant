import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/404/404.webp')" }}
        >
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md gap-y-4">
                <Image className='sm:h-32 w-auto' src="/images/logos/le-neuilly-canva.png" alt="Le Neuilly Logo" width={1097} height={845} />
                <h1 className="text-4xl font-bold text-gray-800 mt-8">Oops! Cette page est introuvable...</h1>
                <p className="text-lg text-gray-600 mt-4">
                    On dirait que vous avez commandé un plat qui n'est pas au menu.
                </p>
                <Link
                    href={'/'}
                    className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow hover:bg-gray-400 text-center"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
