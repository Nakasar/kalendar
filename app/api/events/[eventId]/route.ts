import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } },
) {
  return NextResponse.json(
    { error: { message: "Not implemented" } },
    { status: 501 },
  );
}
