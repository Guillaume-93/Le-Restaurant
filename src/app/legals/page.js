// app/legals/page.js

"use client";

import { IdentificationIcon, UserIcon, ClipboardDocumentListIcon, ServerIcon } from '@heroicons/react/20/solid';

const legalData = [
    {
        title: "1. Présentation du site",
        content: [
            "Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site [nom-du-site] les présentes mentions légales.",
            "La connexion et la navigation sur le site [nom-du-site] par l’utilisateur impliquent l'acceptation intégrale et sans réserve des présentes mentions légales.",
        ],
        details: [
            {
                icon: IdentificationIcon,
                label: "Propriétaire du site",
                description: "[Nom complet du propriétaire], Dénomination sociale : [Nom de la société], Forme juridique : [Forme juridique de la société], Adresse : [Adresse complète], Numéro de téléphone : [Numéro de téléphone], Adresse e-mail : [Adresse e-mail], Numéro d'immatriculation : [Numéro RCS ou RM], Capital social : [Montant du capital social]"
            },
            {
                icon: UserIcon,
                label: "Directeur de la publication",
                description: "[Nom complet du directeur de la publication], Contact : [E-mail du directeur de la publication]"
            },
            {
                icon: ServerIcon,
                label: "Hébergement du site",
                description: "Nom de l'hébergeur : [Nom de l'hébergeur], Raison sociale : [Raison sociale de l'hébergeur], Adresse de l'hébergeur : [Adresse complète de l'hébergeur], Numéro de téléphone : [Numéro de téléphone de l'hébergeur]"
            },
        ]
    },
    {
        title: "2. Propriété intellectuelle et contrefaçons",
        content: [
            "Le site [nom-du-site] est une œuvre de l'esprit protégée par les lois de la propriété intellectuelle. Tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels, sont la propriété exclusive de [nom-du-propriétaire], sauf mention contraire.",
            "Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de [nom-du-propriétaire].",
            "Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle."
        ],
        details: []
    },
    {
        title: "3. Limitations de responsabilité",
        content: [
            "Le site [nom-du-site] ne pourra être tenu pour responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site [nom-du-site], et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées, soit de l’apparition d’un bug ou d’une incompatibilité.",
            "Le site [nom-du-site] ne pourra également être tenu pour responsable des dommages indirects (tels qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site [nom-du-site].",
            "Des espaces interactifs (possibilité de poser des questions dans l’espace contact) sont à la disposition des utilisateurs. [nom-du-site] se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, [nom-du-site] se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …)."
        ],
        details: []
    },
    {
        title: "4. Gestion des données personnelles",
        content: [
            "Aucune donnée personnelle n'est collectée ni traitée à l'insu des utilisateurs du site [nom-du-site]. Conformément à la loi informatique et libertés du 6 janvier 1978, modifiée par le règlement général sur la protection des données (RGPD), les utilisateurs disposent d’un droit d’accès, de rectification, de suppression et d’opposition de leurs données personnelles. Pour exercer ces droits, les utilisateurs peuvent contacter le responsable du traitement des données à l’adresse suivante : [adresse-email-de-contact].",
            "Les utilisateurs sont informés de l'utilisation de cookies lors de la navigation sur le site [nom-du-site]. Ceux-ci peuvent être configurés dans le navigateur pour refuser les cookies, bien que cela puisse limiter l'accès à certaines fonctionnalités."
        ],
        details: []
    },
    {
        title: "5. Liens hypertextes et cookies",
        content: [
            "Le site [nom-du-site] contient un certain nombre de liens hypertextes vers d’autres sites (partenaires, informations, etc.) mis en place avec l’autorisation de [nom-du-propriétaire]. Cependant, [nom-du-site] n’a pas la possibilité de vérifier le contenu des sites ainsi visités et décline donc toute responsabilité de ce fait quant aux risques éventuels de contenus illicites.",
            "L’utilisateur est informé que lors de ses visites sur le site [nom-du-site], un ou des cookies sont susceptibles de s’installer automatiquement sur son ordinateur par l’intermédiaire de son logiciel de navigation. Un cookie est un bloc de données qui ne permet pas d’identifier l’utilisateur, mais qui enregistre des informations relatives à la navigation de celui-ci sur le site.",
            "Le paramétrage du logiciel de navigation permet d’informer de la présence de cookies et éventuellement, de refuser ceux-ci de manière décrite à l’adresse suivante : [lien vers la page de la CNIL]. Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l’installation des cookies : [instructions de configuration selon le navigateur utilisé]."
        ],
        details: []
    },
    {
        title: "6. Droit applicable et attribution de juridiction",
        content: [
            "Tout litige en relation avec l’utilisation du site [nom-du-site] est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de [ville-de-juridiction]."
        ],
        details: []
    },
    {
        title: "7. Les principales lois concernées",
        content: [],
        details: [
            {
                icon: ClipboardDocumentListIcon,
                label: "Loi n° 78-17 du 6 janvier 1978",
                description: "Loi modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés."
            },
            {
                icon: ClipboardDocumentListIcon,
                label: "Loi n° 2004-575 du 21 juin 2004",
                description: "Loi pour la confiance dans l'économie numérique."
            },
        ]
    },
    {
        title: "8. Lexique",
        content: [
            "Utilisateur : Internaute se connectant, utilisant le site susnommé.",
            "Informations personnelles : « Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978)."
        ],
        details: []
    },
];

function LegalSection({ title, content, details }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
            {content.map((paragraph, idx) => (
                <p key={idx} className="mt-4 text-base leading-7 text-gray-700">{paragraph}</p>
            ))}
            {details.length > 0 && (
                <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                    {details.map((detail, idx) => (
                        <li key={idx} className="flex gap-x-3">
                            <detail.icon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[--link-color-background]" />
                            <span>
                                <strong className="font-semibold text-gray-900">{detail.label}</strong>{": "}
                                {detail.description}
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
                {/* <div
                    aria-hidden="true"
                    className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)',
                        }}
                        className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div> */}
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
