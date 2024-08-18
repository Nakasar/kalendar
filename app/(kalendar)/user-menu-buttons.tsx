import SignIn from "@/components/sign-in";
import { BellIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/app/auth";
import React from "react";

const userNavigation = [
  { name: "Mon profil", href: "/account" },
  { name: "Paramètres", href: "/settings" },
];

export async function UserMenuButton() {
  const session = await auth();

  if (!session) {
    return (
      <>
        <SignIn />
      </>
    );
  } else {
    return (
      <>
        <button
          type="button"
          className="relative flex-shrink-0 rounded-full p-1 text-zaffre-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Notifications</span>
          <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative ml-4 flex-shrink-0">
          <div>
            <MenuButton className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Ouvrir le menu utilisateur</span>
              <img
                alt=""
                src={session?.user?.image ?? ""}
                className="h-8 w-8 rounded-full"
              />
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
            <MenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
              >
                <button type="submit">Déconnexion</button>
              </form>
            </MenuItem>
          </MenuItems>
        </Menu>
      </>
    );
  }
}

export async function UserMenuList() {
  const session = await auth();

  if (!session) {
    return (
      <div className="mt-3 space-y-1 px-2">
        <form
          action={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          <button
            type="submit"
            className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gold-600 bg-gold"
          >
            Connexion
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img
              alt=""
              src={session?.user?.image ?? ""}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <div className="truncate text-base font-medium text-gray-800">
              {session.user?.name ?? "-"}
            </div>
            <div className="truncate text-sm font-medium text-gray-500">
              {session.user?.email ?? "-"}
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
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
          >
            <button type="submit">Déconnexion</button>
          </form>
        </div>
      </>
    );
  }
}
