import Layout from '../app/layout';
import { CheckIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Menu() {
    const [menuData, setMenuData] = useState({
        menusPrices: [],
        menuCarte: [],
        dessertsMenu: [],
        wineMenu: []
    });

    useEffect(() => {
        fetch('/menu-data.json')
            .then((response) => response.json())
            .then((data) => setMenuData(data))
            .catch((error) => console.error('Error loading menu data:', error));
    }, []);

    return (
        <Layout>
            <div className="py-24 sm:py-32">

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
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {menuData.menusPrices.map((menu, menuIdx) => (
                            <div
                                key={menu.id}
                                className={classNames(
                                    menu.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-20',
                                    menuIdx === 0 ? 'lg:rounded-r-none' : '',
                                    menuIdx === menuData.menusPrices.length - 1 ? 'lg:rounded-l-none' : '',
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
                                        {Array.isArray(menu.features) ? (
                                            menu.features.map((feature) => (
                                                <li key={feature} className="flex gap-x-3">
                                                    <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-[#112E34]" />
                                                    {feature}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Caractéristiques non disponibles</li>
                                        )}
                                    </ul>

                                </div>
                                <Link
                                    href={menu.href}
                                    aria-describedby={menu.id}
                                    className={classNames(
                                        menu.mostPopular
                                            ? 'bg-[#112E34] text-white hover:bg-[#1c4d57]'
                                            : 'text-[#112E34] ring-1 ring-inset ring-[#112E34] hover:ring-[#297c8d]',
                                        'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 shadow-default transition-all duration-200 active:scale-95 active:shadow-inner',
                                    )}
                                >
                                    Réserver
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu à la Carte */}
                <div id="a-la-carte" className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">À la Carte</h2>
                            <p className="mt-2 text-lg leading-8 text-slate-600">
                                Explorez nos plats à la carte, soigneusement sélectionnés pour satisfaire toutes vos envies culinaires.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {menuData.menuCarte.map((post) => (
                                <article key={post.id} className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            alt=""
                                            src={post.imageUrl}
                                            className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                                                <a href={post.href}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </a>
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{post.description}</p>
                                            <p className="mt-2 text-sm font-semibold text-slate-900">{post.price}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desserts */}
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Desserts</h2>
                            <p className="mt-2 text-lg leading-8 text-slate-600">
                                Terminez votre repas en beauté avec nos desserts faits maison.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {menuData.dessertsMenu.map((dessert) => (
                                <article key={dessert.id} className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            alt=""
                                            src={dessert.imageUrl}
                                            className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900">
                                                <span className="absolute inset-0" />
                                                {dessert.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{dessert.description}</p>
                                            <p className="mt-2 text-sm font-semibold text-slate-900">{dessert.price}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carte des Vins */}
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Carte des Vins</h2>
                            <p className="mt-2 text-lg leading-8 text-slate-600">
                                Découvrez notre sélection de vins soigneusement choisis pour accompagner vos plats.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {menuData.wineMenu.map((wine) => (
                                <article key={wine.id} className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <img
                                            alt=""
                                            src={wine.imageUrl}
                                            className="aspect-[16/9] w-full rounded-2xl bg-slate-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] shadow-default"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/10" />
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="group relative">
                                            <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900">
                                                <span className="absolute inset-0" />
                                                {wine.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{wine.description}</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">Millésime : {wine.year}</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">Volume : {wine.volume}</p>
                                            <p className="mt-2 text-sm font-semibold text-slate-900">{wine.price}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}
