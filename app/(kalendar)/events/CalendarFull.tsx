"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  getDaysWithEventsInCalendarRangeForMonth,
  RPEvent,
} from "@/app/lib/events";
import Link from "next/link";
import { CalendarPlusIcon } from "lucide-react";
import { NewEventDialog } from "@/app/(kalendar)/events/NewEventDialog";
import { useSession } from "next-auth/react";

export function CalendarFull() {
  const currentDate = DateTime.now().setLocale("fr");

  const { status: sessionStatus } = useSession();

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
    getDaysWithEventsInCalendarRangeForMonth(dateFrom.toISO()).then((days) => {
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
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {dateFrom.toFormat("LLLL yyyy")}
          </h1>
          <div className="flex items-center">
            <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={() => setDateFrom(dateFrom.minus({ month: 1 }))}
              >
                <span className="sr-only">Mois précédent</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                onClick={() => {
                  setDateFrom(currentDate.startOf("month"));
                  setSelectedDay(currentDate);
                }}
              >
                Aujourd&apos;hui
              </button>
              <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                onClick={() => setDateFrom(dateFrom.plus({ month: 1 }))}
              >
                <span className="sr-only">Mois suivant</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              {sessionStatus === "authenticated" && (
                <NewEventDialog
                  openButton={
                    <button className="ml-6 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gold-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 flex gap-2 items-center">
                      <CalendarPlusIcon className="size-4" /> Nouvel évènement
                    </button>
                  }
                />
              )}
            </div>
            <Menu as="div" className="relative ml-6 md:hidden">
              <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Ouvrir le menu</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {sessionStatus === "authenticated" && (
                  <div className="py-1">
                    <MenuItem>
                      <NewEventDialog
                        openButton={
                          <button className="px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex items-center gap-2">
                            <CalendarPlusIcon className="size-4" /> Nouvel
                            évènement
                          </button>
                        }
                      />
                    </MenuItem>
                  </div>
                )}
                <div className="py-1">
                  <MenuItem>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      onClick={() => {
                        setDateFrom(currentDate.startOf("month"));
                        setSelectedDay(currentDate);
                      }}
                    >
                      Aller à aujourd&apos;hui
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </header>
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              L<span className="sr-only sm:not-sr-only">un</span>
            </div>
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">ar</span>
            </div>
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">er</span>
            </div>
            <div className="bg-white py-2">
              J<span className="sr-only sm:not-sr-only">eu</span>
            </div>
            <div className="bg-white py-2">
              V<span className="sr-only sm:not-sr-only">en</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">am</span>
            </div>
            <div className="bg-white py-2">
              D<span className="sr-only sm:not-sr-only">im</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days.map((day) => {
                const isToday = DateTime.fromISO(day.date).hasSame(
                  currentDate,
                  "day",
                );
                const isSelected = DateTime.fromISO(day.date).hasSame(
                  selectedDay,
                  "day",
                );

                return (
                  <div
                    key={day.date}
                    className={cn(
                      day.isCurrentMonth
                        ? "bg-white"
                        : "bg-gray-50 text-gray-500",
                      isSelected && "bg-gray-200",
                      "relative px-3 py-2 cursor-pointer hover:bg-gray-200",
                    )}
                    onClick={() => {
                      const date = DateTime.fromISO(day.date);

                      if (date.isValid) {
                        setSelectedDay(date);
                      }
                    }}
                  >
                    <time
                      dateTime={day.date}
                      className={
                        isToday
                          ? "flex h-6 w-6 items-center justify-center rounded-full bg-gold font-semibold text-black"
                          : undefined
                      }
                    >
                      {DateTime.fromISO(day.date).day}
                    </time>
                    {day.events && day.events.length > 0 && (
                      <ol className="mt-2">
                        {day.events.slice(0, 2).map((event) => (
                          <li key={event.id}>
                            <Link
                              href={`/events/${event.id}`}
                              className="group flex"
                            >
                              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {event.title}
                              </p>
                              <time
                                dateTime={event.start}
                                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                              >
                                {DateTime.fromISO(event.start, {
                                  locale: "fr",
                                }).toLocaleString(DateTime.TIME_SIMPLE)}
                              </time>
                            </Link>
                          </li>
                        ))}
                        {day.events.length > 2 && (
                          <li
                            className="text-gray-500"
                            onClick={() => {
                              const date = DateTime.fromISO(day.date);

                              if (date.isValid) {
                                setSelectedDay(date);
                              }
                            }}
                          >
                            + {day.events.length - 2} autre
                          </li>
                        )}
                      </ol>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {days.map((day) => {
                const isSelected = DateTime.fromISO(day.date).hasSame(
                  selectedDay,
                  "day",
                );
                const isToday = DateTime.fromISO(day.date).hasSame(
                  currentDate,
                  "day",
                );

                return (
                  <button
                    key={day.date}
                    type="button"
                    className={cn(
                      day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                      (isSelected || isToday) && "font-semibold",
                      isSelected && "text-white",
                      !isSelected && isToday && "text-indigo-600",
                      !isSelected &&
                        day.isCurrentMonth &&
                        !isToday &&
                        "text-gray-900",
                      !isSelected &&
                        !day.isCurrentMonth &&
                        !isToday &&
                        "text-gray-500",
                      "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10",
                    )}
                  >
                    <time
                      dateTime={day.date}
                      className={cn(
                        isSelected &&
                          "flex h-6 w-6 items-center justify-center rounded-full",
                        isSelected && isToday && "bg-gold",
                        isSelected && !isToday && "bg-gray-900",
                        "ml-auto",
                      )}
                      onClick={() => {
                        const date = DateTime.fromISO(day.date);

                        if (date.isValid) {
                          setSelectedDay(date);
                        }
                      }}
                    >
                      {DateTime.fromISO(day.date).day}
                    </time>
                    <span className="sr-only">
                      {day.events?.length ?? 0} évènements
                    </span>
                    {day.events && day.events.length > 0 && (
                      <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                        {day.events.map((event) => (
                          <span
                            key={event.id}
                            className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <h2 className="text-base font-semibold leading-6 text-gray-900 pt-4">
          Programme du{" "}
          <time dateTime={selectedDay.toISO()}>
            {selectedDay.toLocaleString(DateTime.DATE_FULL)}
          </time>
        </h2>
        {eventsOfSelectedDay.length > 0 && (
          <div className="px-4 py-10 sm:px-6">
            <div className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
              {eventsOfSelectedDay.map((event) => (
                <Link
                  href={`/events/${event.id}`}
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <time
                      dateTime={event.start}
                      className="mt-2 flex items-center text-gray-700"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {DateTime.fromISO(event.start, {
                        locale: "fr",
                      }).toLocaleString(DateTime.TIME_SIMPLE)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
