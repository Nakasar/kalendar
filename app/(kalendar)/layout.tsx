import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import logo from "@/app/images/logo.png";

const user = {
  name: "Abaddon",
  email: "abaddon@croisee.eu",
};
const navigation = [
  { name: "Accueil", href: "/", current: true },
  { name: "Evènements", href: "/events", current: false },
  { name: "Rumeurs", href: "/rumeurs", current: false },
  { name: "Personnages", href: "/personnages", current: false },
];
const userNavigation = [
  { name: "Mon profil", href: "/account" },
  { name: "Paramètres", href: "/settings" },
  { name: "Déconnexion", href: "#" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <Popover as="header" className="bg-zaffre-600 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative flex items-center justify-center py-5 lg:justify-between">
            {/* Logo */}
            <div className="absolute left-0 flex-shrink-0 lg:static">
              <Link href="#">
                <span className="sr-only">Kalendar</span>
                <Image alt="Kalendar" src={logo} className="h-10 w-auto" />
              </Link>
            </div>

            {/* Right section on desktop */}
            <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
              <button
                type="button"
                className="relative flex-shrink-0 rounded-full p-1 text-zaffre-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-4 flex-shrink-0">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Image alt="" src={logo} className="h-8 w-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:scale-95 data-[closed]:data-[leave]:transform data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-75 data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>

            {/* Search */}
            <div className="min-w-0 flex-1 px-12 lg:hidden">
              <div className="mx-auto w-full max-w-xs">
                <label htmlFor="desktop-search" className="sr-only">
                  Search
                </label>
                <div className="relative text-white focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>
                  <input
                    id="desktop-search"
                    name="search"
                    type="search"
                    placeholder="Rechercher"
                    className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/* Menu button */}
            <div className="absolute right-0 flex-shrink-0 lg:hidden">
              {/* Mobile menu button */}
              <PopoverButton className="group relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-zaffre-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Ouvrir le menu principal</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </PopoverButton>
            </div>
          </div>
          <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
            <div className="grid grid-cols-3 items-center gap-8">
              <div className="col-span-2">
                <nav className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={cn(
                        item.current ? "text-white" : "text-zaffre-100",
                        "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <div className="mx-auto w-full max-w-md">
                  <label htmlFor="mobile-search" className="sr-only">
                    Rechercher
                  </label>
                  <div className="relative text-white focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>
                    <input
                      id="mobile-search"
                      name="search"
                      type="search"
                      placeholder="Rechercher"
                      className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <PopoverBackdrop
            transition
            className="fixed inset-0 z-20 bg-black bg-opacity-25 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <PopoverPanel
            focus
            transition
            className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="pb-2 pt-3">
                <div className="flex items-center justify-between px-4">
                  <div>
                    <Image alt="Kalendar" src={logo} className="h-8 w-auto" />
                  </div>
                  <div className="-mr-2">
                    <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zaffre-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Fermer le menu</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </PopoverButton>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pb-2 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      alt=""
                      src={logo}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <div className="truncate text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="truncate text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zaffre-500 focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </PopoverPanel>
        </div>
      </Popover>
      <main className="-mt-24 pb-8">{children}</main>
      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
            <span className="block sm:inline">
              &copy; 2024 Croisée des Chemins (&copy; ArenaNet pour toutes les
              ressources issues de Guild Wars 2).
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
