"use server";

import { auth } from "@/app/auth";
import dbPromise from "@/lib/mongo";
import { revalidatePath } from "next/cache";

export async function updateUser(
  userId: string,
  data: { isAdmin?: boolean; permissions?: string[] },
) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  const db = await dbPromise;
  const user = await db.collection("users").findOne({ id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  const update: { isAdmin?: boolean; permissions?: string[] } = {};
  if (data.isAdmin !== undefined) {
    update.isAdmin = data.isAdmin;
  }
  if (data.permissions) {
    update.permissions = data.permissions;
  }

  await db.collection("users").updateOne({ id: userId }, { $set: update });

  revalidatePath("/admin/users");
}
