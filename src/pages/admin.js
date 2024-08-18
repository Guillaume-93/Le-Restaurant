import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowLeftStartOnRectangleIcon, Bars3Icon, ArrowUturnLeftIcon, XMarkIcon, StarIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import "../app/globals.css";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import MenuSectionForm from '../components/MenuSectionForm';
import ScrollToTop from '../components/ScrollToTop';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader.js';

function normalizeMenusPricesItem(item) {
    return {
        name: item.name || '',
        infos: item.infos || false,
        id: item.id || Date.now().toString(),
        href: item.href || '/contact',
        price: item.price || '',
        description: item.description || '',
        features: item.features || [],
        mostPopular: item.mostPopular || false,
    };
}

function normalizeMenuCarteOrDessertsItem(item) {
    return {
        id: item.id || Date.now(),
        title: item.title || '',
        description: item.description || '',
        imageUrl: item.imageUrl || '',
        price: item.price || '',
        category: {
            title: item.category?.title || '',
        },
    };
}

function normalizeWineMenuItem(item) {
    return {
        id: item.id || Date.now(),
        title: item.title || '',
        description: item.description || '',
        imageUrl: item.imageUrl || '',
        year: item.year || '',
        volume: item.volume || '',
        price: item.price || '',
        category: {
            title: item.category?.title || '',
        },
    };
}

const userNavigation = [
    { name: 'Retour au site', action: () => window.location.href = '/' },
    { name: 'Déconnexion', action: () => signOut() },
];

const navigation = [
    { name: 'Accueil', href: '', section: 'heroSection', current: true },
    { name: 'Menus', href: '', section: 'menusPrices', current: false },
    { name: 'Plats', href: '', section: 'menuCarte', current: false },
    { name: 'Desserts', href: '', section: 'dessertsMenu', current: false },
    { name: 'Vins', href: '', section: 'wineMenu', current: false },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Admin() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [menuData, setMenuData] = useState({
        menusPrices: [],
        menuCarte: [],
        dessertsMenu: [],
        wineMenu: [],
        heroSection: {
            title: "",
            subtitle: "",
            buttonText1: "",
            buttonLink1: "",
            buttonText2: "",
            buttonLink2: "",
            images: [
                { src: "", alt: "" },
                { src: "", alt: "" },
                { src: "", alt: "" },
                { src: "", alt: "" },
                { src: "", alt: "" }
            ],
        }
    });
    const [activeSection, setActiveSection] = useState('heroSection');

    const renderPremiumBadge = () => (
        <div className={`flex items-center space-x-1 mt-2 text-sm`}>
            <span className="flex items-center gap-x-2 text-sm font-bold text-white bg-yellow-500 px-2 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                Passer à l'offre Premium
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
            </span>
        </div>
    );

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/check-authorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session.user.email }),
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.isAuthorized) {
                        router.replace('/unauthorized');
                    } else {
                        fetch('/api/menu-data', {
                            credentials: 'include',
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                const normalizedData = {
                                    menusPrices: data.menusPrices.map(normalizeMenusPricesItem),
                                    menuCarte: data.menuCarte.map(normalizeMenuCarteOrDessertsItem),
                                    dessertsMenu: data.dessertsMenu.map(normalizeMenuCarteOrDessertsItem),
                                    wineMenu: data.wineMenu.map(normalizeWineMenuItem),
                                    heroSection: data.heroSection || {
                                        title: '',
                                        subtitle: '',
                                        buttonText1: '',
                                        buttonLink1: '',
                                        buttonText2: '',
                                        buttonLink2: '',
                                        images: [{ src: '', alt: 'Divers photos de présentation' }]
                                    }
                                };
                                setMenuData(normalizedData);
                            })
                            .catch(err => console.error("Error fetching menu data:", err));
                    }
                })
                .catch(err => {
                    console.error("Error checking authorization:", err);
                    toast.error('Une erreur est survenue lors de la vérification de l\'autorisation.');
                });
        }
    }, [session, status]);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        navigation.forEach(nav => nav.current = nav.section === section);
    };

    const handleInputChange = (e, section, index, field) => {
        const value = e.target.value;
        setMenuData(prevData => {
            if (Array.isArray(prevData[section])) {
                // Si la section est un tableau
                const updatedSection = [...prevData[section]];
                if (field.includes('.')) {
                    const [parentField, childField] = field.split('.');
                    updatedSection[index][parentField] = {
                        ...updatedSection[index][parentField],
                        [childField]: value,
                    };
                } else {
                    updatedSection[index][field] = value;
                }
                return { ...prevData, [section]: updatedSection };
            } else {
                // Si la section est un objet
                const updatedSection = { ...prevData[section], [field]: value };
                return { ...prevData, [section]: updatedSection };
            }
        });
    };


    const handleAddItem = (section) => {
        if (!Array.isArray(menuData[section])) return; // Ne pas ajouter d'élément si ce n'est pas un tableau

        setMenuData(prevData => {
            let newItem;
            switch (section) {
                case 'menusPrices':
                    newItem = normalizeMenusPricesItem({ id: Date.now().toString(), name: 'Nouveau Menu' });
                    break;
                case 'menuCarte':
                case 'dessertsMenu':
                    newItem = normalizeMenuCarteOrDessertsItem({ id: Date.now(), title: 'Nouveau Plat' });
                    break;
                case 'wineMenu':
                    newItem = normalizeWineMenuItem({ id: Date.now(), title: 'Nouveau Vin' });
                    break;
                default:
                    newItem = {};
            }

            const updatedSection = [...prevData[section], newItem];
            return { ...prevData, [section]: updatedSection };
        });
    };

    const handleRemoveItem = (section, index) => {
        if (!Array.isArray(menuData[section])) return; // Ne pas supprimer d'élément si ce n'est pas un tableau

        setMenuData(prevData => {
            const updatedSection = prevData[section].filter((_, i) => i !== index);
            return { ...prevData, [section]: updatedSection };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/menu-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(menuData),
        });

        if (res.ok) {
            toast.success('Données mises à jour avec succès !');
        } else {
            toast.error('Échec de la mise à jour des données.');
        }
    };

    if (status === "loading") {
        return <div><Loader /></div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex items-center justify-center h-screen px-2">
                <div className="flex flex-col gap-y-4">
                    <img className='h-32 w-auto' src="images/logos/le-neuilly-canva.png" alt="" />
                    <p className="text-lg">Vous n'êtes pas connecté. Veuillez vous connecter pour continuer.</p>
                    <button
                        onClick={() => signIn()}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700"
                    >
                        Se connecter
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full">
            <div className="bg-[--background-color-primary] pb-32">
                <Disclosure as="nav" className="bg-[--background-color-primary]">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="border-b border-slate-700">
                            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            alt="Le Neuilly Logo"
                                            src="images/logos/le-neuilly-canva.png"
                                            className="h-8 cursor-pointer"
                                            onClick={() => window.location.href = '/'}
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">

                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => handleSectionChange(item.section)}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-slate-900 text-white'
                                                            : 'text-slate-900 hover:bg-slate-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                                                    <span className='px-2 text-slate-200'>{session.user.name}</span>
                                                    <img alt="" src={session?.user?.image || user.imageUrl} className="h-8 w-8 rounded-full" />
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {/* <button
                                                    onClick={() => window.location.href = '/'}
                                                    className="block px-4 py-2 text-sm font-medium text-slate-700 data-[focus]:bg-slate-100"
                                                >
                                                    Retour au site
                                                </button> */}
                                                {userNavigation.map((item) => (
                                                    <MenuItem key={item.name}>
                                                        <button
                                                            onClick={item.action}
                                                            className="inline-flex w-full px-4 py-2 text-sm font-medium text-slate-700 data-[focus]:bg-slate-100"
                                                        >
                                                            {item.name}
                                                        </button>
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Ouvrir le menu principal</span>
                                        <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="border-b border-slate-700 md:hidden">
                        <div className="space-y-1 px-2 py-3 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href="#"
                                    onClick={() => handleSectionChange(item.section)}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-slate-900 text-slate-100' : 'text-slate-700 hover:bg-slate-700 hover:text-slate-100',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-slate-700 pb-3 pt-4">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img alt="" src={session?.user?.image || user.imageUrl} className="h-10 w-10 rounded-full" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-slate-800">{session?.user?.name || user.name}</div>
                                    <div className="text-sm font-medium leading-none text-slate-500">{session?.user?.email || user.email}</div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4 px-2 flex flex-col items-start">
                                <DisclosureButton
                                    as="a"
                                    href="/"
                                    onClick={() => window.location.href = '/'}
                                    className="w-auto flex items-center px-3 py-1 text-base font-medium bg-slate-900 text-white rounded-md"
                                >
                                    <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
                                    Retour au site
                                </DisclosureButton>
                                <DisclosureButton
                                    as="a"
                                    href=""
                                    onClick={() => signOut()}
                                    className="w-auto flex items-center rounded-md px-3 py-1 text-base font-medium text-slate-100 bg-red-600"
                                >
                                    <ArrowLeftStartOnRectangleIcon className="h-4 w-4 mr-2" />
                                    Déconnexion
                                </DisclosureButton>
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
                <header className="py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="ml-1 text-3xl font-bold tracking-tight text-slate-900">Tableau de bord</h1>
                        {renderPremiumBadge()}
                    </div>
                </header>
            </div>
            <main className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                        {activeSection !== 'null' && (
                            <MenuSectionForm
                                sectionData={menuData[activeSection]}
                                sectionName={activeSection}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                handleAddItem={handleAddItem}
                                handleRemoveItem={handleRemoveItem}
                                setMenuData={setMenuData}
                                menuData={menuData}
                                renderPremiumBadge={renderPremiumBadge}
                            />
                        )}
                    </div>
                </div>
            </main>
            <ScrollToTop />
        </div>
    );
}
