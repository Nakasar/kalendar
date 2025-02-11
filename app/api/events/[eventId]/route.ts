import { NextResponse } from "next/server";
import { getEvent } from "@/app/lib/events";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params;

  const event = await getEvent(eventId);

  if (!event) {
    return NextResponse.json(
      { error: { message: "Event not found" } },
      { status: 404 },
    );
  }

  return NextResponse.json({
    id: event.id,
    href: `${process.env.NEXT_PUBLIC_URL}/events/${event.id}`,
    title: event.title,
    description: event.description,
    start: event.start,
    end: event.end,
    location: event.location,
    cover: event.cover,
    createdAt: event.createdAt,
  });
}
