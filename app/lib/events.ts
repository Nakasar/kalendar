"use server";

import "server-only";

import { DateTime } from "luxon";
import dbPromise from "@/lib/mongo";
import { makeCalendarDays } from "@/lib/utils";

export type RPEvent = {
  id: string;
  title: string;
  description: string;
  cover?: string;
  start: string;
  end: string;
  location: string;
  createdAt: string;
  creator: string;
};

export async function createEvent(event: RPEvent) {
  const db = await dbPromise;

  await db.collection("events").insertOne(event);
}

export async function getNextEvents(): Promise<RPEvent[]> {
  const db = await dbPromise;

  const events = await db
    .collection("events")
    .find({
      end: { $gte: DateTime.now().toISO() },
    })
    .project<RPEvent>({ _id: 0 })
    .sort({ start: 1 })
    .limit(2)
    .toArray();

  return events;
}

export async function getEvent(id: string): Promise<RPEvent | null> {
  const db = await dbPromise;

  const event = await db.collection<RPEvent>("events").findOne(
    {
      id,
    },
    { projection: { _id: 0 } },
  );

  return event;
}

export async function getEventsInDateRange(
  from: string,
  to: string,
): Promise<RPEvent[]> {
  const db = await dbPromise;

  const events = await db
    .collection("events")
    .find({
      start: { $gte: from },
      end: { $lte: to },
    })
    .project<RPEvent>({ _id: 0 })
    .toArray();

  return events;
}

export async function getDaysWithEventsInCalendarRangeForMonth(
  month: number,
  year: number,
) {
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
