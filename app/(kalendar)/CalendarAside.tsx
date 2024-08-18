"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { CalendarPlusIcon, Clock1Icon } from "lucide-react";
import { DateTime } from "luxon";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { RPEvent } from "@/app/lib/events";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { NewEventDialog } from "@/app/(kalendar)/events/NewEventDialog";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getDaysWithEventsInCalendarRangeForMonth } from "@/app/(kalendar)/events/actions";
import { userHasPermissions } from "@/lib/permissions";

export function CalendarAside() {
  const currentDate = DateTime.now().setLocale("fr");

  const session = useSession();

  const [dateFrom, setDateFrom] = useState(currentDate.startOf("month"));
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [days, setDays] = useState<
    {
      date: string;
      isCurrentMonth?: boolean;
      events?: RPEvent[];
    }[]
  >([]);
  const [eventsOfSelectedDay, setEventsOfSelectedDay] = useState<RPEvent[]>([]);

  useEffect(() => {
    getDaysWithEventsInCalendarRangeForMonth(
      dateFrom.month,
      dateFrom.year,
    ).then((days) => {
      setDays(days);
      const matchingSelectedDay = days.find((day) =>
        DateTime.fromISO(day.date).hasSame(selectedDay, "day"),
      );

      if (matchingSelectedDay) {
        setEventsOfSelectedDay(matchingSelectedDay.events ?? []);
      }
    });
  }, [dateFrom]);

  useEffect(() => {
    const matchingSelectedDay = days.find((day) =>
      DateTime.fromISO(day.date).hasSame(selectedDay, "day"),
    );

    if (matchingSelectedDay) {
      setEventsOfSelectedDay(matchingSelectedDay.events ?? []);
    }
  }, [selectedDay]);

  return (
    <div>
      <div className="flex items-center">
        <h2 className="flex-auto text-sm font-semibold text-gray-900">
          {dateFrom.toFormat("LLLL yyyy")}
        </h2>
        {userHasPermissions(session.data?.user, "events:create") && (
          <NewEventDialog
            openButton={
              <button className="bg-gold rounded-full p-2 hover:bg-gold-600">
                <CalendarPlusIcon className="size-4" />
              </button>
            }
          />
        )}
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => setDateFrom(dateFrom.minus({ month: 1 }))}
        >
          <span className="sr-only">Mois précédent</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => {
            setDateFrom(currentDate.startOf("month"));
            setSelectedDay(currentDate);
          }}
        >
          <span className="sr-only">Aujourd&apos;hui</span>
          <CalendarIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => setDateFrom(dateFrom.plus({ month: 1 }))}
        >
          <span className="sr-only">Mois suivant</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>L</div>
        <div>M</div>
        <div>M</div>
        <div>J</div>
        <div>V</div>
        <div>S</div>
        <div>D</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => {
          const isSelected = DateTime.fromISO(day.date).hasSame(
            selectedDay,
            "day",
          );
          const isToday = DateTime.fromISO(day.date).hasSame(
            currentDate,
            "day",
          );

          return (
            <div
              key={day.date}
              className={cn(dayIdx > 6 && "border-t border-gray-200", "py-2")}
            >
              <button
                className={cn(
                  isSelected && "text-black",
                  !isSelected &&
                    !isToday &&
                    day.isCurrentMonth &&
                    "text-gray-900",
                  !isSelected &&
                    !isToday &&
                    !day.isCurrentMonth &&
                    "text-gray-400",
                  isSelected && isToday && "bg-gold",
                  isSelected &&
                    "border-4 border-zaffre border-dotted bg-gray-200",
                  !isSelected && "hover:bg-gray-200",
                  isToday && "bg-gold",
                  (isSelected || isToday) && "font-semibold",
                  "mx-auto flex flex-col h-8 w-8 items-center justify-center rounded-full",
                )}
                onClick={() => {
                  const date = DateTime.fromISO(day.date);
                  if (date.isValid) {
                    setSelectedDay(date);
                  }
                }}
              >
                <time dateTime={day.date}>
                  {DateTime.fromISO(day.date).day}
                </time>
              </button>

              <div className="h-1.5 flex flex-row justify-center mt-1">
                {day.events && day.events.length === 1 && (
                  <svg
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    className="h-1.5 w-1.5 fill-zaffre"
                  >
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                )}
                {day.events && day.events.length > 1 && (
                  <div className="flex flex-row items-center">
                    <svg
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                      className="h-1.5 w-1.5 fill-zaffre"
                    >
                      <circle r={3} cx={3} cy={3} />
                    </svg>
                    <PlusIcon className="size-3" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <section className="mt-12">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Programme du{" "}
          <time dateTime={selectedDay.toISO()}>
            {selectedDay.toLocaleString(DateTime.DATE_FULL)}
          </time>
        </h2>
        <div className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {eventsOfSelectedDay.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
            >
              <div className="flex-auto">
                <p className="text-gray-900 font-semibold">{event.title}</p>
                <div className="flex flex-row gap-2">
                  <MapPinIcon className="size-4 self-center" />
                  <p className="text-gray-400">{event.location}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <Clock1Icon className="size-4 self-center" />
                  <p className="text-gray-600">
                    <time dateTime={event.start}>
                      {DateTime.fromISO(event.start, {
                        locale: "fr",
                      }).toLocaleString(DateTime.TIME_SIMPLE)}
                    </time>{" "}
                    -{" "}
                    <time dateTime={event.end}>
                      {DateTime.fromISO(event.end, {
                        locale: "fr",
                      }).toLocaleString(DateTime.TIME_SIMPLE)}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
