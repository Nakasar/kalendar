"use server";

import "server-only";

import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import { createEvent, RPEvent } from "@/app/lib/events";

export async function submitEventCreation(formData: FormData) {
  const startDate = formData.get("startDate");
  const startTime = formData.get("startTime");

  const endDate = formData.get("endDate");
  const endTime = formData.get("endTime");

  const start = DateTime.fromISO(`${startDate}T${startTime}`).toUTC().toISO();
  const end = DateTime.fromISO(`${endDate}T${endTime}`).toUTC().toISO();

  if (!start || !end) {
    throw new Error("Invalid date/time");
  }

  const event: RPEvent = {
    id: nanoid(8),
    title: formData.get("title") as string,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    start: start,
    end: end,
    createdAt: DateTime.utc().toISO(),
    creator: nanoid(8),
  };

  await createEvent(event);

  redirect(`/events/${event.id}`);
}
