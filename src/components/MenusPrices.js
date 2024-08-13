import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const menusPrices = [
    {
        name: 'Menu Déjeuner',
        infos: true,
        id: 'menu-dejeuner',
        href: '/contact',
        price: '20€',
        description: 'Un menu parfait pour un déjeuner rapide et délicieux.',
        features: ['Entrée au choix', 'Plat principal au choix', 'Dessert du jour', 'Café inclus'],
        mostPopular: false,
    },
    {
        name: 'Menu Gourmand',
        infos: false,
        id: 'menu-gourmand',
        href: '/contact',
        price: '30€',
        description: 'Un menu pour les gourmands, avec des plats généreux et raffinés.',
        features: [
            'Entrée au choix',
            'Deux plats principaux au choix',
            'Fromage ou dessert',
            'Un verre de vin inclus',
        ],
        mostPopular: true,
    },
    {
        name: 'Menu Dégustation',
        infos: false,
        id: 'menu-degustation',
        href: '/contact',
        price: '55€',
        description: 'Découvrez notre cuisine avec un menu dégustation de cinq services.',
        features: [
            'Amuse-bouche',
            'Trois plats principaux',
            'Plateau de fromages',
            'Dessert au choix',
            'Accords mets et vins inclus',
        ],
        mostPopular: false,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    return (
        <div className="py-24 sm:py-32 mt-32">

            {/* Menus Prices */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-[#112E34]">Nos Menus</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Découvrez nos offres de menus pour tous les goûts
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
                    Que vous soyez de passage pour un déjeuner rapide ou pour une soirée gourmande, nous avons un menu qui répondra à vos attentes.
                </p>
                <div className="mt-10 flex justify-center">
                    <Link href="/menu#a-la-carte" className="text-base font-semibold leading-7 text-[#112E34] after:block after:h-0.5 after:w-0 after:bg-slate-600 after:duration-300 hover:after:w-full">
                        Voir la carte <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {menusPrices.map((menu, menuIdx) => (
                        <div
                            key={menu.id}
                            className={classNames(
                                menu.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-20',
                                menuIdx === 0 ? 'lg:rounded-r-none' : '',
                                menuIdx === menusPrices.length - 1 ? 'lg:rounded-l-none' : '',
                                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-slate-200 xl:p-10',
                            )}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3
                                        id={menu.id}
                                        className={classNames(
                                            menu.mostPopular ? 'text-[#112E34]' : 'text-slate-900',
                                            'text-lg font-semibold leading-8',
                                        )}
                                    >
                                        {menu.name}
                                    </h3>
                                    {menu.mostPopular ? (
                                        <p className="rounded-full bg-[#112E34] px-2.5 py-1 text-xs font-semibold leading-5 text-slate-100">
                                            Populaire
                                        </p>
                                    ) : null}
                                </div>
                                {menu.infos ? (
                                        <p className="font-bold text-sm leading-6 text-slate-600">
                                            (Sauf week-end et jours fériés.)
                                        </p>
                                    ) : null}
                                <p className="mt-4 text-sm leading-6 text-slate-600">{menu.description}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-slate-900">{menu.price}</span>
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                                    {menu.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-[#112E34]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                href={menu.href}
                                aria-describedby={menu.id}
                                className={classNames(
                                    menu.mostPopular
                                        ? 'bg-[#112E34] text-white hover:bg-[#1c4d57]'
                                        : 'text-[#112E34] ring-1 ring-inset ring-[#112E34] hover:ring-[#297c8d]',
                                    'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-default transition-all duration-200 active:scale-95 active:shadow-inner',
                                )}
                            >
                                Réserver
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
