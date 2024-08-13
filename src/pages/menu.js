import Layout from '../app/layout';
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

const menuCarte = [
    {
        id: 1,
        title: 'Double Carpaccio de boeuf',
        description:
            'Accompagné de sa sauce pesto, de ses copeaux de parmesan et de ses frites maison.',
        imageUrl: 'images/menus/plats/double-carpaccio-de-boeuf.webp',
        price: '18,90€',
        category: { title: 'PLATS' },
    },
    {
        id: 2,
        title: 'La César',
        description:
            'Salade mêlée, tomates, poulet, parmesan, croûtons.',
        imageUrl: 'images/menus/plats/la-cesar.webp',
        price: '16,90€',
        category: { title: 'PLATS' },
    },
    {
        id: 3,
        title: 'Burrata à la truffe (150g)',
        description:
            'Accompagnée de tomates cerises et de son fameux vinaigre balsamique caramélisé maison, pain toasté.',
        imageUrl: 'images/menus/plats/burrata-a-la-truffe.webp',
        price: '16,90€',
        category: { title: 'PLATS' },
    },
    {
        id: 4,
        title: 'Cuisse de canard confite',
        description:
            'Et ses accompagnements au choix.',
        imageUrl: 'images/menus/plats/cuisse-de-canard-confite.webp',
        price: '17,90€',
        category: { title: 'PLATS' },
    },
    {
        id: 5,
        title: 'Burger',
        description:
            'Servi avec frites maison.',
        imageUrl: 'images/menus/plats/burger.webp',
        price: '15,90€',
        category: { title: 'PLATS' },
    },
    {
        id: 6,
        title: 'Entrecôte grillée',
        description:
            'À la fleur de sel et poivre concassé. Sauce au choix : béarnaise, poivre vert.',
        imageUrl: 'images/menus/plats/entrecote-grillee.webp',
        price: '23,00€',
        category: { title: 'PLATS' },
    },
    {
        id: 7,
        title: 'Menu enfant',
        description:
            'Steak haché frites, boules de glace vanille et sirop à l’eau.',
        imageUrl: 'images/menus/menu-enfant.webp',
        price: '10,00€',
        category: { title: 'PLATS' },
    },
    {
        id: 8,
        title: 'Accompagnements',
        description:
            'Frites maison / Garniture du moment.',
        imageUrl: 'images/menus/accompagnements/accompagnements.webp',
        price: '4,00€',
        category: { title: 'PLATS' },
    },
    {
        id: 9,
        title: 'Café gourmand',
        description:
            'Un assortiment de desserts en format mini.',
        imageUrl: 'images/menus/desserts/cafe-gourmand.webp',
        price: '7,00€',
        category: { title: 'DESSERTS' },
    },
    {
        id: 10,
        title: 'Thé gourmand',
        description:
            'Un assortiment de desserts en format mini, accompagné de thé.',
        imageUrl: 'images/menus/desserts/the-gourmand.webp',
        price: '8,00€',
        category: { title: 'DESSERTS' },
    },
]

const dessertsMenu = [
    {
        id: 1,
        title: 'Tarte Tatin',
        description: 'Délicieuse tarte aux pommes caramélisées, servie avec une boule de glace vanille.',
        imageUrl: 'images/menus/desserts/tarte-tatin.webp',
        price: '8,00€',
        category: { title: 'Desserts' },
    },
    {
        id: 2,
        title: 'Crème Brûlée',
        description: 'Crème onctueuse à la vanille avec une croûte de sucre caramélisé.',
        imageUrl: 'images/menus/desserts/creme-brulee.webp',
        price: '7,50€',
        category: { title: 'Desserts' },
    },
    {
        id: 3,
        title: 'Mousse au Chocolat',
        description: 'Mousse légère et onctueuse au chocolat noir.',
        imageUrl: 'images/menus/desserts/mousse-au-chocolat.webp',
        price: '9,00€',
        category: { title: 'Desserts' },
    },
]

const wineMenu = [
    {
        id: 1,
        title: 'Maranges',
        description: 'Domaine Bonnardot, Bourgogne.',
        imageUrl: 'images/menus/vins/maranges.webp',
        year: '2018/2019',
        volume: '75 cl',
        price: '42,00€',
        category: { title: 'Rouge - Bourgogne' },
    },
    {
        id: 2,
        title: 'Pinot Noir',
        description: 'Domaine Saint-Germain, Bourgogne.',
        imageUrl: 'images/menus/vins/pinot-noir.webp',
        year: '2019',
        volume: '75 cl',
        price: '39,00€',
        category: { title: 'Rouge - Bourgogne' },
    },
    {
        id: 3,
        title: 'Santenay',
        description: 'Domaine Bonnardot, Bourgogne.',
        imageUrl: 'images/menus/vins/santenay.webp',
        year: '2020',
        volume: '75 cl',
        price: '44,00€',
        category: { title: 'Rouge - Bourgogne' },
    },
    {
        id: 4,
        title: 'Morgon Côte du Py',
        description: 'Domaine Arnaud Aucoeur, Beaujolais.',
        imageUrl: 'images/menus/vins/morgon-cote-du-py.webp',
        year: '2020',
        volume: '75 cl',
        price: '36,00€',
        category: { title: 'Beaujolais' },
    },
    {
        id: 5,
        title: 'Domaine LeVieux',
        description: 'Beaumes de Venise, Rhône.',
        imageUrl: 'images/menus/vins/domaine-levieux.webp',
        year: '2021',
        volume: '75 cl',
        price: '32,00€',
        category: { title: 'Rhône' },
    },
    {
        id: 6,
        title: 'Château Tour St-Joseph',
        description: 'Haut-Médoc, Bordeaux.',
        imageUrl: 'images/menus/vins/chateau-tour-st-joseph.webp',
        year: '2018',
        volume: '75 cl',
        price: '39,00€',
        category: { title: 'Haut-Médoc' },
    },
    {
        id: 7,
        title: 'Château Forçats',
        description: 'Côte Roussillon.',
        imageUrl: 'images/menus/vins/chateau-forcats.webp',
        year: '2018',
        volume: '75 cl',
        price: '34,00€',
        category: { title: 'Côte Roussillon' },
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
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
                            {menuCarte.map((post) => (
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
                            {dessertsMenu.map((dessert) => (
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
                            {wineMenu.map((wine) => (
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
