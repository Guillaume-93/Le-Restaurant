"use client";

import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-[#1c4d57] [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={0}
            id="1d4240dd-898f-445f-932d-e2872fd12de3"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={0} className="overflow-visible fill-[#112E34]">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div> */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Réservez dès maintenant.
          <br />
          Profitez d'une expérience culinaire unique.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Réservez votre table facilement en ligne et assurez-vous d'avoir
          une place lors de votre visite.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/contact"
            className="rounded-md bg-[--link-color-background] px-4 py-3 text-center text-sm font-semibold text-slate-100 shadow-3xl transition-all duration-200 hover:bg-[--link-color-hover] active:scale-95 active:shadow-inner"
          >
            Réserver une table
          </Link>
          {/* <a
              href="#"
              className="text-sm font-semibold leading-6 text-white"
            >
              En savoir plus <span aria-hidden="true">→</span>
            </a> */}
        </div>
      </div>
    </div>
  );
};

export default CTASection;
