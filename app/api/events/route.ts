import { NextResponse } from "next/server";
import { getNextEvents } from "@/app/lib/events";

export async function POST() {
  return NextResponse.json(
    { error: { message: "Not implemented" } },
    { status: 501 },
  );
}

export async function GET() {
  const events = await getNextEvents();

  return NextResponse.json(
    events.map((event) => ({
      id: event.id,
      href: `${process.env.NEXT_PUBLIC_URL}/events/${event.id}`,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      location: event.location,
      cover: event.cover,
      createdAt: event.createdAt,
    })),
    { status: 206 },
  );
}
