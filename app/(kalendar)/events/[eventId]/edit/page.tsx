import { getEvent } from "@/app/lib/events";
import React from "react";
import { EventEdit } from "@/app/(kalendar)/events/[eventId]/edit/EventEdit";
import { auth } from "@/app/auth";
import { userHasPermissions } from "@/lib/permissions";

export default async function EventEditPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
  const session = await auth();

  if (!event) {
    return <div>Event not found</div>;
  }

  if (
    event.creator !== session?.user.id &&
    !userHasPermissions(session?.user, "events:editAll")
  ) {
    return <div>Vous ne pouvez pas mettre à jour cet évènement.</div>;
  }

  return <EventEdit event={event} />;
}
