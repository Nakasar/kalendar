import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime, Interval } from "luxon";
import { RPEvent } from "@/app/lib/events";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeCalendarDays(date: string): {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  events?: RPEvent[];
}[] {
  const currentDate = DateTime.fromISO(date).setLocale("fr");

  const calendarStart = currentDate.startOf("month").startOf("week");
  const calendarEnd = currentDate.endOf("month").endOf("week");
  const range = Interval.fromDateTimes(calendarStart, calendarEnd).splitBy({
    days: 1,
  });

  const days = range.map((day) => {
    if (!day.start) {
      return null;
    }

    return {
      date: day.start.toISO(),
      isCurrentMonth: day.start.hasSame(currentDate, "month"),
    };
  });

  return days.filter((day) => day !== null);
}

export function makeCalendarDaysWithEvents(date: string, events: any[]) {
  const days = makeCalendarDays(date);

  for (const day of days) {
    day.events = events.filter((event) =>
      DateTime.fromISO(event.start).hasSame(DateTime.fromISO(day.date), "day"),
    );
  }

  return days;
}
