"use server";

import "server-only";

import { Ajv } from "ajv";
import addFormats from "ajv-formats";
import { DateTime } from "luxon";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import {
  createEvent,
  getEvent,
  getEventsInDateRange,
  RPEvent,
  updateEvent,
} from "@/app/lib/events";
import { put, PutBlobResult } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/auth";
import { makeCalendarDays } from "@/lib/utils";
import { userHasPermissions } from "@/lib/permissions";

const ajv = new Ajv();
addFormats(ajv);

export async function submitEventCreation(formData: FormData) {
  const session = await auth();
  if (
    !session?.user?.id ||
    !userHasPermissions(session.user, "events:create")
  ) {
    throw new Error("Unauthorized");
  }

  const start = DateTime.fromISO(
    `${formData.get("startDate")}T${formData.get("startTime")}`,
  )
    .toUTC()
    .toISO();
  const end = DateTime.fromISO(
    `${formData.get("endDate")}T${formData.get("endTime")}`,
  )
    .toUTC()
    .toISO();

  const data = {
    title: formData.get("title"),
    location: formData.get("location"),
    description: formData.get("description"),
    start,
    end,
  };

  const schema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 1, maxLength: 100 },
      location: { type: "string", maxLength: 100 },
      description: { type: "string", maxLength: 10000 },
      start: { type: "string", format: "date-time" },
      end: { type: "string", format: "date-time" },
    },
    required: ["title", "start", "end"],
  };
  const validate = ajv.compile<{
    title: string;
    location: string;
    description: string;
    start: string;
    end: string;
  }>(schema);
  if (!validate(data)) {
    console.warn({ data, errors: validate.errors });
    throw new Error("Invalid event data");
  }

  if (!start || !end) {
    throw new Error("Invalid date/time");
  }

  if (DateTime.fromISO(start) > DateTime.fromISO(end)) {
    throw new Error("Start date/time must be before end date/time");
  }

  let coverBlob: PutBlobResult | undefined;
  if (formData.has("cover")) {
    const coverFile = formData.get("cover") as File;

    if (coverFile.size > 0) {
      if (coverFile.size > 4 * 1024 * 1024) {
        throw new Error("Cover image is too large");
      }

      if (coverFile.type !== "image/jpeg" && coverFile.type !== "image/png") {
        throw new Error("Cover image must be a JPEG or PNG file");
      }

      coverBlob = await put(coverFile.name, coverFile, {
        access: "public",
      });
    }
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

export async function updateEventAction(
  eventId: string,
  event: Partial<RPEvent>,
) {
  const session = await auth();

  const existingEvent = await getEvent(eventId);

  if (!existingEvent) {
    throw new Error("Event not found");
  }

  if (
    event.creator !== session?.user.id &&
    !userHasPermissions(session?.user, "events:editAll")
  ) {
    throw new Error("Unauthorized");
  }

  await updateEvent(existingEvent.id, event);

  revalidatePath(`/`);
  revalidatePath(`/events`);
  revalidatePath(`/events/${existingEvent.id}`);
  revalidatePath(`/events/${existingEvent.id}/edit`);

  redirect(`/events/${existingEvent.id}`);
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
