import { Suspense } from "react";
import { RumorsPage } from "@/app/(kalendar)/rumeurs/Rumors";

export default function Rumeurs() {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <RumorsPage />
      </Suspense>
    </div>
  );
}
