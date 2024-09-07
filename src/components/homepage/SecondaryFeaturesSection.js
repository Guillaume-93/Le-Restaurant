'use client'

import {
  BookOpenIcon,
  ComputerDesktopIcon,
  HomeModernIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: "Réservations en ligne",
    description:
      "Réservez votre table facilement en ligne et assurez-vous d'avoir une place lors de votre visite.",
    icon: ComputerDesktopIcon,
  },
  {
    name: "Menus personnalisés",
    description: "Créez des menus personnalisés pour vos événements spéciaux.",
    icon: BookOpenIcon,
  },
  {
    name: "Plâts à emporter",
    description:
      "Profitez de nos plats délicieux chez vous grâce à notre service de plâts à emporter.",
    icon: HomeModernIcon,
  },
  {
    name: "Ingrédients locaux",
    description:
      "Nous privilégions les ingrédients locaux et de saison pour garantir la fraîcheur et la qualité.",
    icon: ShoppingCartIcon,
  },
]

const SecondaryFeaturesSection = () => {
  return (
    <div className="relative mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#112E34]">Tout ce dont vous avez besoin</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Un service sans faille
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Nos services sont conçus pour offrir une expérience culinaire
            mémorable à chaque visite.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#112E34] shadow-default">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-slate-100" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SecondaryFeaturesSection;
