"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { RPEvent } from "@/app/lib/events";
import { userHasPermissions } from "@/lib/permissions";

export function EditEventButton({ event }: { event: RPEvent }) {
  const session = useSession();

  if (
    event.creator !== session.data?.user?.id &&
    !userHasPermissions(session.data?.user, "events:edit")
  ) {
    return null;
  }

  return (
    <Link
      href={`/events/${event.id}/edit`}
      className="text-white bg-zaffre hover:bg-zaffre-700 rounded-md px-4 py-2"
    >
      Editer
    </Link>
  );
}
