import dbPromise from "@/lib/mongo";

export async function getUserByEmail(email: string): Promise<{
  id: string;
  email: string;
  permissions: string[];
  isAdmin: boolean;
} | null> {
  const db = await dbPromise;

  return db.collection("users").findOne<{
    id: string;
    email: string;
    permissions: string[];
    isAdmin: boolean;
  }>({ email }, { projection: { _id: 0 } });
}

export async function createUser(user: {
  id: string;
  email: string;
  permissions: string[];
  isAdmin: boolean;
}): Promise<{
  id: string;
  email: string;
  permissions: string[];
  isAdmin: boolean;
}> {
  const db = await dbPromise;

  await db.collection("users").insertOne(user);

  return user;
}
