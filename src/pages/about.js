import Layout from '../app/layout';
import {
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link';

const stats = [
    { label: 'Fondé', value: '2022' },
    { label: 'Employés', value: '4' },
    { label: 'Plats au menu', value: '15+' },
    { label: 'Clients servis', value: '1000+' },
];

export default function Example() {
    return (
        <Layout>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-4">
                            <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 pb-9 pt-64 shadow-default sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                <img
                                    alt="Propriétaire du restaurant"
                                    src="images/avatars/2024-02-14.jpg"
                                    className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                                />
                                <div className="absolute inset-0 bg-slate-600 mix-blend-multiply" />
                                <div
                                    aria-hidden="true"
                                    className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                        }}
                                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#112E34] to-[#1c4d57] opacity-40"
                                    />
                                </div>
                                <figure className="relative isolate">
                                    {/* <img alt="" src="https://tailwindui.com/img/logos/workcation-logo-white.svg" className="h-12 w-auto" /> */}
                                    <ChatBubbleBottomCenterTextIcon aria-hidden="true" className="mt-1 h-10 w-auto flex-none text-slate-100" />
                                    <blockquote className="mt-2 text-xl font-semibold leading-8 text-slate-100">
                                        <p>
                                            “Notre mission est de créer une atmosphère conviviale et chaleureuse, où chaque client se sent comme chez lui. Nous sommes passionnés par la cuisine française et nous nous efforçons d'offrir une expérience culinaire mémorable.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 text-sm leading-6 text-slate-300">
                                        <strong className="font-semibold text-white">Farida Belaidi,</strong> Propriétaire du restaurant Le Neuilly
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div>
                            <div className="text-base leading-7 text-slate-700 lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-[#112E34]">À propos de nous</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Découvrez notre histoire
                                </h1>
                                <div className="max-w-xl">
                                    <p className="mt-6">
                                        Le Neuilly est un restaurant familial situé au cœur de la ville, offrant une cuisine française authentique avec une touche moderne. Nous sommes fiers de notre histoire et de notre engagement à utiliser des ingrédients locaux et de saison.
                                    </p>
                                    <p className="mt-8">
                                        Depuis notre ouverture en 2022, nous nous efforçons de créer une atmosphère conviviale où nos clients peuvent se détendre et profiter de repas délicieux. Notre menu varié met en avant les saveurs traditionnelles françaises tout en y apportant une touche contemporaine.
                                    </p>
                                    <p className="mt-8">
                                        Situé au 2 Rue Louis Vanini, 93330 Neuilly-sur-Marne, Le Neuilly est plus qu'un simple restaurant, c'est un lieu de rencontre pour les amis et la famille, où chaque plat est préparé avec passion et souci du détail.
                                    </p>
                                </div>
                            </div>
                            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-slate-900/10 pt-10 sm:grid-cols-4">
                                {stats.map((stat, statIdx) => (
                                    <div key={statIdx}>
                                        <dt className="text-sm font-semibold leading-6 text-slate-600">{stat.label}</dt>
                                        <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-slate-900">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-10 flex">
                                <Link href="/contact" className="text-base font-semibold leading-7 text-[--text-color-primary] after:block after:h-0.5 after:w-0 after:bg-slate-600 after:duration-300 hover:after:w-full">
                                    Contactez-nous <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
