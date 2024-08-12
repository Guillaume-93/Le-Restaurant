import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto pb-24 pt-20 sm:pb-40 lg:flex lg:px-8">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <img
            alt="Le Neuilly"
            src="/images/le-neuilly-header.png"
            className="h-40 object-cover sm:rounded-lg lg:shadow-2xl"
          />
          <h1 className="mt-10 px-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:px-8 lg:text-7xl">
            Découvrez notre cuisine raffinée
          </h1>
          <p className="mt-6 px-6 text-lg leading-8 text-gray-300 lg:px-8">
            Découvrez une expérience culinaire unique dans un cadre élégant et
            chaleureux. Le Neuilly vous propose une cuisine française raffinée,
            préparée avec des ingrédients frais et de qualité.
          </p>
          <div className="mt-10 flex items-center gap-x-6 px-6 lg:px-8">
            <a
              href="#"
              className="rounded-md bg-[#FFE318] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm ring-1 ring-[#FFE318] transition-colors duration-200 hover:bg-transparent hover:text-white"
            >
              Réserver une table
            </a>
            <Link
              href="/menu"
              className="after:transition-width relative text-sm font-semibold leading-6 text-white after:mt-1 after:block after:h-0.5 after:w-0 after:bg-white after:duration-300 hover:after:w-full"
            >
              Voir le menu <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="lg:max-w-none">
            <img
              alt="App screenshot"
              src="/images/mousse-au-chocolat-reduit.png"
              width={2432}
              height={1442}
              className="w-[76rem] bg-white/5 shadow-2xl ring-1 ring-white/10 sm:rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
