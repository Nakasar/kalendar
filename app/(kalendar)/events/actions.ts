"use server";

import "server-only";

import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import { createEvent, getEventsInDateRange, RPEvent } from "@/app/lib/events";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";
import { makeCalendarDays } from "@/lib/utils";

export async function submitEventCreation(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const startDate = formData.get("startDate");
  const startTime = formData.get("startTime");

  const endDate = formData.get("endDate");
  const endTime = formData.get("endTime");

  const start = DateTime.fromISO(`${startDate}T${startTime}`).toUTC().toISO();
  const end = DateTime.fromISO(`${endDate}T${endTime}`).toUTC().toISO();

  if (!start || !end) {
    throw new Error("Invalid date/time");
  }

  const coverFile = formData.get("cover") as File;
  const coverBlob = await put(coverFile.name, coverFile, {
    access: "public",
  });

  const event: RPEvent = {
    id: nanoid(8),
    title: formData.get("title") as string,
    cover: coverBlob.url,
    location: formData.get("location") as string,
    description: formData.get("description") as string,
    start: start,
    end: end,
    createdAt: DateTime.utc().toISO(),
    creator: nanoid(8),
  };

  await createEvent(event);

  revalidatePath(`/`);
  revalidatePath(`/events`);
  revalidatePath(`/events/${event.id}`);
  redirect(`/events/${event.id}`);
}

export async function getDaysWithEventsInCalendarRangeForMonth(
  month: number,
  year: number,
): Promise<
  {
    date: string;
    isCurrentMonth?: boolean;
    events?: RPEvent[];
  }[]
> {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const date = DateTime.fromObject({ month, year }).toISO();
  if (!date) {
    throw new Error("Invalid date range");
  }

  const days = makeCalendarDays(date);

  const events = await getEventsInDateRange(
    days[0].date,
    days[days.length - 1].date,
  );

  for (const day of days) {
    day.events = events
      .filter((event) =>
        DateTime.fromISO(event.start).hasSame(
          DateTime.fromISO(day.date),
          "day",
        ),
      )
      .sort(
        (a, b) =>
          DateTime.fromISO(a.start).diff(DateTime.fromISO(b.start))
            .milliseconds,
      );
  }

  return days;
}
