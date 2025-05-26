import "server-only";

import dbPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";

type RumorDb = {
  text: string;
  author: string;
  createdAt: Date;
};

export type Rumor = {
  _id: string;
  text: string;
  author: string;
  createdAt: Date;
};

export async function getRumors(): Promise<Rumor[]> {
  const db = await dbPromise;
  const rumors = await db
    .collection<RumorDb>("gossips")
    .find()
    .limit(10)
    .toArray();

  return rumors.map((rumor) => ({
    ...rumor,
    _id: rumor._id.toString(),
  }));
}

export async function deleteRumor(rumorId: string): Promise<void> {
  const db = await dbPromise;
  await db
    .collection<RumorDb>("gossips")
    .deleteOne({ _id: new ObjectId(rumorId) });
}
