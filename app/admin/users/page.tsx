import { getUsers } from "@/app/lib/users";
import { redirect } from "next/navigation";
import { Field, Label } from "@headlessui/react";
import {
  UserAdminSwitch,
  UserBlockedSwitch,
  UserPermissionsList,
} from "@/app/admin/users/components";
import Link from "next/link";

export default async function Users({
  searchParams,
}: {
  searchParams: { offset: string };
}) {
  if (isNaN(parseInt(searchParams.offset))) {
    return redirect("/admin/users?offset=0");
  }

  const offset = parseInt(searchParams.offset) ?? 0;
  const users = await getUsers(offset);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Utilisateurs</h1>

        <div className="space-x-2">
          <Link
            href={`/admin/users?offset=${offset - 10 >= 0 ? offset - 10 : 0}`}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
          >
            Précédent
          </Link>
          <Link
            href={`/admin/users?offset=${offset + 10}`}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
          >
            Suivant
          </Link>
        </div>
      </div>

      <ul className="pt-4 space-x-2">
        {users.map((user) => (
          <li key={user.id} className="border-2 border-gray-200 p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <p>{user.email}</p>
              <Field className="flex items-center">
                <UserAdminSwitch isAdmin={user.isAdmin} userId={user.id} />
                <Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">
                    Administrateur
                  </span>
                </Label>
              </Field>
              <Field className="flex items-center">
                <UserBlockedSwitch blocked={user.blocked} userId={user.id} />
                <Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">Bloqué</span>
                </Label>
              </Field>
              <UserPermissionsList
                userId={user.id}
                permissions={user.permissions}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
