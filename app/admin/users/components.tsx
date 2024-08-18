"use client";

import { Switch } from "@headlessui/react";

import { updateUser } from "@/app/admin/users/actions";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent } from "react";

export function UserAdminSwitch({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) {
  return (
    <Switch
      checked={isAdmin}
      onChange={async () => {
        await updateUser(userId, { isAdmin: !isAdmin });
      }}
      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
  );
}

export function UserBlockedSwitch({
  userId,
  blocked,
}: {
  userId: string;
  blocked: boolean;
}) {
  return (
    <Switch
      checked={blocked}
      onChange={async () => {
        await updateUser(userId, { blocked: !blocked });
      }}
      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 data-[checked]:bg-red-600"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
  );
}

export function UserPermissionsList({
  userId,
  permissions,
}: {
  userId: string;
  permissions: string[];
}) {
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center">
      {permissions.map((permission) => (
        <span
          key={permission}
          className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
        >
          {permission}
          <button
            className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
            onClick={async () => {
              await updateUser(userId, {
                permissions: permissions.filter((p) => p !== permission),
              });
            }}
          >
            <span className="sr-only">Retirer</span>
            <svg
              viewBox="0 0 14 14"
              className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-gray-700/75"
            >
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span className="absolute -inset-1" />
          </button>
        </span>
      ))}
      <Dialog>
        <DialogTrigger>
          <PlusIcon className="size-4 text-gray-600" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une permission</DialogTitle>
            <DialogDescription>
              Ajouter une nouvelle permission à l&apos;utilisateur sélectionné.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (event: FormEvent<HTMLFormElement>) => {
              event?.preventDefault();

              const newPermission = event.currentTarget.permission.value;

              if (!newPermission || permissions.includes(newPermission)) {
                return;
              }

              await updateUser(userId, {
                permissions: [...permissions, newPermission],
              });
            }}
            className="gap-2 flex flex-col"
          >
            <div>
              <label
                htmlFor="permission"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Permission
              </label>
              <div className="mt-2">
                <input
                  id="permission"
                  name="permission"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <DialogFooter>
              <button
                type="submit"
                className="bg-gold rounded-lg py-2 px-4 hover:bg-gold-600"
              >
                Ajouter
              </button>
              <DialogClose asChild>
                <button className="bg-gray-200 rounded-lg py-2 px-4 hover:bg-gray-300">
                  Annuler
                </button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
