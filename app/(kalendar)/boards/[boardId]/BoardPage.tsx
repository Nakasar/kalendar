"use client";

import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export function BoardComponentWrapped() {
  return <ExcalidrawWrapper />;
}
