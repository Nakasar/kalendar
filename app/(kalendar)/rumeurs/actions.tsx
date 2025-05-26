"use server";

import { auth } from "@/app/auth";
import { deleteRumor } from "@/lib/rumors";
import { revalidatePath } from "next/cache";

export async function deleteRumorAction(rumorId: string) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  await deleteRumor(rumorId);
  revalidatePath("/rumeurs");
}
