import "server-only";

import { DateTime } from "luxon";
import dbPromise from "@/lib/mongo";

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
