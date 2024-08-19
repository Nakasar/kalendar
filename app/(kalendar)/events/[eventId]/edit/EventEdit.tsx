"use client";

import "@mdxeditor/editor/style.css";
import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { RPEvent } from "@/app/lib/events";
import Link from "next/link";
import { updateEventAction } from "@/app/(kalendar)/events/actions";

const EditorComponent = dynamic(
  () => import("@/app/(kalendar)/events/[eventId]/edit/EditorComponent"),
  { ssr: false },
);

export function EventEdit({ event }: { event: RPEvent }) {
  const [startDate, setStartDate] = useState(
    DateTime.fromISO(event.start).toISODate() ?? DateTime.now().toISODate(),
  );
  const [endDate, setEndDate] = useState(
    DateTime.fromISO(event.end).toISODate() ?? DateTime.now().toISODate(),
  );
  const [startTime, setStartTime] = useState(
    DateTime.fromISO(event.start).toFormat("HH:mm"),
  );
  const [endTime, setEndTime] = useState(
    DateTime.fromISO(event.end).toFormat("HH:mm"),
  );
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [title, setTitle] = useState(event.title);

  const dateInvalid =
    DateTime.fromISO(endDate + "T" + endTime) <
    DateTime.fromISO(startDate + "T" + startTime);

  async function submitSave() {
    if (dateInvalid) {
      return;
    }

    const start = DateTime.fromISO(`${startDate}T${startTime}`).toUTC().toISO();
    const end = DateTime.fromISO(`${endDate}T${endTime}`).toUTC().toISO();

    if (!start || !end) {
      return;
    }

    const data = {
      title,
      location,
      description,
      start,
      end,
    };

    await updateEventAction(event.id, data);
  }

  return (
    <div className="bg-white m-8 p-4 rounded-md">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col space-y-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Titre*
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaffre sm:text-sm sm:leading-6"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Lieu
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaffre sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>

            <div className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaffre sm:text-sm sm:leading-6">
              <EditorComponent
                markdown={description}
                setMarkdown={setDescription}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date de début
              </label>
              <div className="mt-2">
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className={cn(
                    dateInvalid
                      ? "text-red-600 border-red-600 border-2 ring-red-300 focus:ring-red-600"
                      : "text-gray-900 ring-gray-300 focus:ring-zaffre",
                    "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
                  )}
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Heure de début
              </label>
              <div className="mt-2">
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  className={cn(
                    dateInvalid
                      ? "text-red-600 ring-red-300 focus:ring-red-600"
                      : "text-gray-900 ring-gray-300 focus:ring-zaffre",
                    "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                  )}
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date de fin
              </label>
              <div className="mt-2">
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className={cn(
                    dateInvalid
                      ? "text-red-600 border-red-600 border-2 ring-red-300 focus:ring-red-600"
                      : "text-gray-900 ring-gray-300 focus:ring-zaffre",
                    "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
                  )}
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Heure de fin
              </label>
              <div className="mt-2">
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  className={cn(
                    dateInvalid
                      ? "text-red-600 ring-red-300 focus:ring-red-600"
                      : "text-gray-900 ring-gray-300 focus:ring-zaffre",
                    "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                  )}
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="text-red-600">
            {dateInvalid && "La date de fin doit être après la date de début"}
          </div>

          <div className="flex flex-row justify-end space-x-2">
            <button
              className={cn("bg-gold text-black rounded-md py-1.5 px-4")}
              onClick={submitSave}
            >
              Sauvegarder
            </button>
            <Link
              href={`/events/${event.id}`}
              className="bg-gray-400 rounded-md py-1.5 px-4 text-white"
            >
              Annuler
            </Link>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
