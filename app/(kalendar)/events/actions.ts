"use server";

import "server-only";

import { Ajv } from "ajv";
import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import { createEvent, getEventsInDateRange, RPEvent } from "@/app/lib/events";
import { put, PutBlobResult } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";
import { makeCalendarDays } from "@/lib/utils";
import { userHasPermissions } from "@/lib/permissions";

const ajv = new Ajv();

export async function submitEventCreation(formData: FormData) {
  const session = await auth();
  if (
    !session?.user?.id ||
    !userHasPermissions(session.user, "events:create")
  ) {
    throw new Error("Unauthorized");
  }

  const data = {
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    startTime: formData.get("startTime"),
    endDate: formData.get("endDate"),
    endTime: formData.get("endTime"),
  };

  const schema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 1, maxLength: 100 },
      location: { type: "string", maxLength: 100 },
      description: { type: "string", maxLength: 10000 },
      startDate: { type: "string", format: "date" },
      startTime: { type: "string", format: "time" },
      endDate: { type: "string", format: "date" },
      endTime: { type: "string", format: "time" },
    },
    required: ["title", "startDate", "startTime", "endDate", "endTime"],
  };
  const validate = ajv.compile<{
    title: string;
    location: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  }>(schema);
  if (!validate(data)) {
    throw new Error("Invalid event data");
  }

  const start = DateTime.fromISO(`${data.startDate}T${data.startTime}`)
    .toUTC()
    .toISO();
  const end = DateTime.fromISO(`${data.endDate}T${data.endTime}`)
    .toUTC()
    .toISO();

  if (!start || !end) {
    throw new Error("Invalid date/time");
  }

  if (DateTime.fromISO(start) > DateTime.fromISO(end)) {
    throw new Error("Start date/time must be before end date/time");
  }

  let coverBlob: PutBlobResult | undefined;
  if (formData.has("cover")) {
    const coverFile = formData.get("cover") as File;
    coverBlob = await put(coverFile.name, coverFile, {
      access: "public",
    });
  }

  const event: RPEvent = {
    id: nanoid(8),
    title: data.title,
    cover: coverBlob?.url,
    location: data.location ?? "",
    description: data.description ?? "",
    start: start,
    end: end,
    createdAt: DateTime.utc().toISO(),
    creator: session.user.id,
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
