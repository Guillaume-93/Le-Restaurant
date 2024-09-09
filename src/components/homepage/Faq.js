'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "Quels sont les plats les plus populaires au restaurant Le Neuilly ?",
        answer:
            "Nos plats les plus populaires incluent le magret de canard avec sa sauce aux fruits rouges, et notre célèbre soupe à l'oignon gratinée.",
    },
    {
        question: "Est-il nécessaire de réserver une table à l'avance ?",
        answer:
            "Bien que nous acceptions les clients sans réservation, il est fortement recommandé de réserver à l'avance, surtout le week-end, pour garantir une table.",
    },
    {
        question: "Proposez-vous des options végétariennes ou végétaliennes ?",
        answer:
            "Oui, nous proposons plusieurs options végétariennes et végétaliennes sur notre menu, préparées avec des ingrédients frais et de saison.",
    },
    {
        question: "Disposez-vous d'un service de livraison ou de plats à emporter ?",
        answer:
            "Nous offrons un service de plats à emporter. Vous pouvez passer votre commande par téléphone ou en ligne. Pour le moment, nous ne proposons pas de livraison.",
    },
    {
        question: "Pouvez-vous accueillir des événements spéciaux ou des groupes ?",
        answer:
            "Oui, nous avons une salle privée pour les événements spéciaux et pouvons accueillir des groupes. Veuillez nous contacter pour plus de détails et pour organiser votre événement.",
    },
]

export default function Faq() {
    return (
        <div className="mx-auto py-32 mb-32 px-6 lg:px-8 bg-gradient-to-br from-[var(--gradient-bg-from)] via-[var(--gradient-bg-via)] to-[var(--gradient-bg-to)]">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Questions fréquentes</h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                    {faqs.map((faq) => (
                        <Disclosure key={faq.question} as="div" className="pt-6">
                            <dt>
                                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                                    <span className="ml-6 flex h-7 items-center">
                                        <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                                        <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                                    </span>
                                </DisclosureButton>
                            </dt>
                            <DisclosurePanel as="dd" className="mt-2 pr-12">
                                <p className="text-base leading-7 text-slate-300">{faq.answer}</p>
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </div>
    )
}
