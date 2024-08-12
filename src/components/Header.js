"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function NavLink({ href, children }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <div
        className={`text-sm font-semibold leading-6 ${isActive ? "text-[#FFE318]" : "text-white"}`}
      >
        {children}
      </div>
    </Link>
  );
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-[#213B42] p-4 shadow-md">
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between"
      >
        <div className="ml-auto flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink key={item.name} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#213B42] px-6 py-6 shadow-md sm:max-w-sm sm:ring-2 sm:ring-white">
          <div className="flex items-center justify-between">
            <div className="-m-1.5 p-1.5">
              <Link href="/">
                <span className="sr-only">Le Neuilly</span>
                <img
                  alt="Le Neuilly"
                  src="/images/le-neuilly-header.png"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#fff23f] hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
