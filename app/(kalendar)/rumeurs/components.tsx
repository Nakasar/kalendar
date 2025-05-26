"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { deleteRumorAction } from "@/app/(kalendar)/rumeurs/actions";

export function DeleteRumor({ rumorId }: { rumorId: string }) {
  return (
    <Button variant="ghost" onClick={() => deleteRumorAction(rumorId)}>
      <TrashIcon className="size-5 text-red-500" />
    </Button>
  );
}
