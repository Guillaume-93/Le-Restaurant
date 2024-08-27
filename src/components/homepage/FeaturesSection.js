"use client";

import { BoltIcon, CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/outline";

const primaryFeatures = [
  {
    name: "Cuisine raffinée",
    description:
      "Découvrez une cuisine française authentique avec une touche moderne, préparée avec des ingrédients frais et de qualité.",
    href: "#",
    icon: BoltIcon,
  },
  {
    name: "Ambiance conviviale",
    description:
      "Un cadre chaleureux et élégant pour vous détendre et profiter de repas délicieux avec vos proches.",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Événements spéciaux",
    description:
      "Organisez vos événements spéciaux chez nous et profitez d'un service impeccable et d'une cuisine exquise.",
    href: "#",
    icon: CalendarDaysIcon,
  },
];

const FeaturesSection = () => {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Savourez chaque moment
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tout ce dont vous avez besoin pour une expérience culinaire parfaite
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Notre restaurant offre un service impeccable, une ambiance conviviale et des plats délicieux pour ravir vos papilles.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {primaryFeatures.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-white">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#112E34] shadow-default">
                  <feature.icon aria-hidden="true" className="h-6 w-6 text-slate-100" />
                </div>
                <span className="text-slate-900">{feature.name}</span>
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FeaturesSection;
