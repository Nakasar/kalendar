import "server-only";

import dbPromise from "@/lib/mongo";

export type User = {
  id: string;
  email: string;
  permissions: string[];
  isAdmin: boolean;
  blocked: boolean;
};

export async function getUsers(offset: number): Promise<User[]> {
  const db = await dbPromise;

  return db
    .collection("users")
    .find<User>({}, { projection: { _id: 0 } })
    .skip(offset)
    .limit(10)
    .toArray();
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await dbPromise;

  return db
    .collection("users")
    .findOne<User>({ email }, { projection: { _id: 0 } });
}

export async function createUser(user: User): Promise<User> {
  const db = await dbPromise;

  await db.collection("users").insertOne(user);

  return user;
}
