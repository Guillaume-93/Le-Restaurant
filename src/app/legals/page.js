"use client";

import { IdentificationIcon, ServerIcon } from '@heroicons/react/20/solid';

// Variables dynamiques
const legalVariables = {
    siteName: "Le Neuilly",
    siteUrl: "https://leneuilly.fr",
    ownerName: "Nom du propriétaire",
    ownerCompanyName: "Nom de la société",
    ownerRegistrationNumber: "Numéro d'inscription au RCS",
    ownerVatNumber: "Numéro de TVA intracommunautaire",
    ownerAddress: "Adresse complète, Code postal, Pays",
    ownerPhone: "Numéro de téléphone",
    ownerEmail: "contact@leneuilly.com",
    publicationDirectorName: "Nom du directeur de la publication",
    hostName: "Nom de l'hébergeur",
    hostCompanyName: "Raison sociale de l'hébergeur",
    hostAddress: "Adresse complète de l'hébergeur, Code postal, Pays",
    hostPhone: "Numéro de téléphone de l'hébergeur",
    hostEmail: "support@hebergeur.com",
    jurisdictionCity: "Ville de juridiction"
};

const legalData = [
    {
        title: "1. Présentation du site",
        content: [
            `Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site <strong>${legalVariables.siteName}</strong> les présentes mentions légales.`,
            `La connexion et la navigation sur le site <strong>${legalVariables.siteName}</strong> (<strong>${legalVariables.siteUrl}</strong>) par l’utilisateur impliquent l'acceptation intégrale et sans réserve des présentes mentions légales.`,
        ],
        details: []
    },
    {
        title: "2. Éditeur",
        content: [
            `<strong>${legalVariables.siteName}</strong> est un site web, accessible par les utilisateurs à l’adresse URL suivante <strong>${legalVariables.siteUrl}</strong>, édité par :`,
        ],
        details: [
            {
                icon: IdentificationIcon,
                label: "Éditeur (personne morale)",
                description: `<strong>${legalVariables.ownerCompanyName}</strong>, N° d’immatriculation : <strong>${legalVariables.ownerRegistrationNumber}</strong>, Numéro de TVA intracommunautaire : <strong>${legalVariables.ownerVatNumber}</strong>, Adresse : <strong>${legalVariables.ownerAddress}</strong>, Téléphone : <strong>${legalVariables.ownerPhone}</strong>, Mail : <strong>${legalVariables.ownerEmail}</strong>`
            }
        ]
    },
    {
        title: "3. Directeur de la publication",
        content: [
            `Identité : <strong>${legalVariables.publicationDirectorName}</strong>, Qualité : Directeur de la publication.`,
        ],
        details: []
    },
    {
        title: "4. Hébergeur",
        content: [
            `<strong>${legalVariables.siteName}</strong> est hébergé par <strong>${legalVariables.hostName}</strong>, que vous pouvez contacter à l’adresse email <strong>${legalVariables.hostEmail}</strong> ou l’adresse postale suivante :`,
        ],
        details: [
            {
                icon: ServerIcon,
                label: "Hébergeur",
                description: `<strong>${legalVariables.hostCompanyName}</strong>, Adresse : <strong>${legalVariables.hostAddress}</strong>, Téléphone : <strong>${legalVariables.hostPhone}</strong>, Mail : <strong>${legalVariables.hostEmail}</strong>`
            }
        ]
    },
    {
        title: "5. Propriété intellectuelle et contrefaçons",
        content: [
            `Le site <strong>${legalVariables.siteName}</strong> est une œuvre de l'esprit protégée par les lois de la propriété intellectuelle. Tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels, sont la propriété exclusive de <strong>${legalVariables.ownerName}</strong>, sauf mention contraire.`,
            `Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de <strong>${legalVariables.ownerName}</strong>.`,
            "Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle."
        ],
        details: []
    },
    {
        title: "6. Limitations de responsabilité",
        content: [
            `Le site <strong>${legalVariables.siteName}</strong> ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site <strong>${legalVariables.siteName}</strong>, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées, soit de l’apparition d’un bug ou d’une incompatibilité.`,
            `Le site <strong>${legalVariables.siteName}</strong> ne pourra également être tenu pour responsable des dommages indirects (tels qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site <strong>${legalVariables.siteName}</strong>.`,
            "Le site ne contient pas de formulaire de contact, mais fournit des informations de contact directes par téléphone ou par email."
        ],
        details: []
    },
    {
        title: "7. Gestion des données personnelles et utilisation des cookies",
        content: [
            `Le site <strong>${legalVariables.siteName}</strong> utilise des cookies pour améliorer l'expérience utilisateur. Les cookies sont des fichiers de petite taille déposés sur votre appareil lors de la consultation du site, permettant de collecter des informations sur la navigation.`,
            `Ces cookies ne collectent aucune donnée personnelle sans consentement. Vous pouvez configurer votre navigateur pour refuser les cookies, bien que cela puisse limiter certaines fonctionnalités du site.`,
            `En ce qui concerne les administrateurs, les données personnelles stockées sont relatives à la gestion des sessions de connexion. Ces informations ne sont utilisées que dans le cadre de l'administration du site.`,
            `Conformément à la loi informatique et libertés du 6 janvier 1978, modifiée par le RGPD, les utilisateurs disposent d’un droit d’accès, de rectification, de suppression et d’opposition de leurs données personnelles. Pour exercer ces droits, les utilisateurs peuvent contacter <strong>${legalVariables.ownerEmail}</strong>.`
        ],
        details: []
    },
    {
        title: "8. Droit applicable et attribution de juridiction",
        content: [
            `Tout litige en relation avec l’utilisation du site <strong>${legalVariables.siteName}</strong> est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de <strong>${legalVariables.jurisdictionCity}</strong>.`
        ],
        details: []
    },
    {
        title: "9. Modification des mentions légales",
        content: [
            "Le site se réserve la possibilité de compléter ou modifier les présentes mentions légales à tout moment et sans préavis. Il est recommandé de consulter régulièrement les mentions légales."
        ],
        details: []
    }
];

function LegalSection({ title, content, details }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            {content.map((paragraph, idx) => (
                <p key={idx} className="mt-4 text-base leading-7 text-gray-700" dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
            {details.length > 0 && (
                <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                    {details.map((detail, idx) => (
                        <li key={idx} className="flex gap-x-3">
                            <detail.icon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[--link-color-background]" />
                            <span>
                                <strong className="font-semibold text-gray-900">{detail.label}</strong>{": "}
                                <span dangerouslySetInnerHTML={{ __html: detail.description }} />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function Legals() {
    return (
        <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mentions Légales</h1>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
                    <div className="max-w-xl text-base leading-7 text-gray-700 lg:col-span-7">
                        {legalData.map((section, idx) => (
                            <LegalSection
                                key={idx}
                                title={section.title}
                                content={section.content}
                                details={section.details}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
