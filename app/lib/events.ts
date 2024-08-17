"use server";

import "server-only";

import { DateTime } from "luxon";
import dbPromise from "@/lib/mongo";
import { makeCalendarDays } from "@/lib/utils";

export type RPEvent = {
  id: string;
  name: string;
  start: string;
  end: string;
  location: string;
  createdAt: string;
  creator: string;
};

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

export async function getDaysWithEventsInCalendarRangeForMonth(date: string) {
  const today = DateTime.fromISO(date).toISO();
  if (!today) {
    throw new Error("Invalid date range");
  }

  const days = makeCalendarDays(today);

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
