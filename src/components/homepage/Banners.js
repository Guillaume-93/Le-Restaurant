import { XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Ajout de useRouter pour gérer la navigation manuellement
import Link from 'next/link';

export default function Banners({ title, price }) {
    const [showBanner, setShowBanner] = useState(true);
    const pathname = usePathname();
    const router = useRouter(); // Utiliser useRouter pour rediriger si nécessaire

    const handleClose = () => {
        setShowBanner(false); // Masquer la bannière lorsque le bouton est cliqué
    };

    const handleScrollToMenu = (e) => {
        e.preventDefault();

        if (pathname === '/menu') {
            // Si l'utilisateur est déjà sur la page du menu, utiliser scrollIntoView pour un scroll smooth
            const menuSection = document.querySelector('#special-menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Sinon, rediriger vers la page du menu avec le hash
            router.push('/menu#special-menu');
        }
    };

    if (!showBanner) {
        return null; // Ne rien afficher si showBanner est false
    }

    return (
        <div className='absolute left-1/2 transform -translate-x-1/2 sm:top-[120%] w-full sm:max-w-lg bg-gradient-to-r from-[#407cff] via-[#cecece] to-[#ff4040] sm:rounded-full shadow-default'>
            <div className="bg-white sm:rounded-full px-4 py-2 sm:py-0 my-0.5 sm:m-0.5">
                {/* Utilisation de flex pour aligner le contenu sur une seule ligne */}
                <div className="flex items-center justify-between gap-x-4">
                    {/* Texte et offre */}
                    <div className="flex flex-wrap items-center gap-x-2">
                        <div className="inline-flex items-center gap-x-2 rounded-md py-1 text-sm leading-6 text-gray-900 font-medium">
                            <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-green-400">
                                <circle r={3} cx={3} cy={3} />
                            </svg>
                            <strong className="font-semibold">En ce moment :</strong>
                        </div>
                        <p className="text-sm leading-6 text-gray-900">
                            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                                <circle r={1} cx={1} cy={1} />
                            </svg>
                            {title}
                            <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                                <circle r={1} cx={1} cy={1} />
                            </svg> 
                            {price}
                        </p>
                        <a
                            href="#"
                            onClick={handleScrollToMenu} // Appel du gestionnaire pour le défilement smooth
                            className="flex-none rounded-full  px-3.5 py-1 text-sm font-bold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Voir l&apos;offre <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                    {/* Bouton de fermeture toujours aligné avec le texte */}
                    <div className="flex justify-end">
                        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={handleClose}>
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
