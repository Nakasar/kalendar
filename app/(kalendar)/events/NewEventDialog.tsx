"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { submitEventCreation } from "@/app/(kalendar)/events/actions";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export function NewEventDialog({
  openButton,
}: {
  openButton: React.ReactNode;
}) {
  const [startDate, setStartDate] = useState(DateTime.now().toISODate());
  const [endDate, setEndDate] = useState(DateTime.now().toISODate());
  const [startTime, setStartTime] = useState(DateTime.now().toFormat("HH:mm"));
  const [endTime, setEndTime] = useState(DateTime.now().toFormat("HH:mm"));
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const dateInvalid =
    DateTime.fromISO(endDate + "T" + endTime) <
    DateTime.fromISO(startDate + "T" + startTime);

  useEffect(() => {
    // create the preview
    const coverUrl = cover ? URL.createObjectURL(cover) : "";
    setCoverPreview(coverUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(coverUrl);
  }, [cover]);

  return (
    <Dialog>
      <DialogTrigger asChild>{openButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel évènement</DialogTitle>
          <DialogDescription>
            Création d&apos;un nouvel évènement
          </DialogDescription>
        </DialogHeader>
        <form action={submitEventCreation} className="gap-2 flex flex-col">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaffre sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Couverture
            </label>
            {coverPreview ? (
              <div className="flex flex-col">
                <button
                  className="self-end"
                  onClick={() => {
                    setCover(null);
                    setCoverPreview(null);
                  }}
                >
                  <XIcon className="size-5 inline" />
                </button>
                <img src={coverPreview.toString()} className="aspect-video" />
              </div>
            ) : (
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="cover"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-zaffre focus-within:outline-none focus-within:ring-2 focus-within:ring-zaffre focus-within:ring-offset-2 hover:text-zaffre-500"
                    >
                      <span>Sélectionnez une image</span>
                      <input
                        id="cover"
                        name="cover"
                        type="file"
                        className="sr-only"
                        accept={["image/png", "image/jpeg"].join(",")}
                        onChange={(event) =>
                          setCover(event.target.files?.[0] ?? null)
                        }
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG - max. 4Mo, format 16:9
                  </p>
                </div>
              </div>
            )}

            {cover?.size && cover.size > 4 * 1024 * 1024 && (
              <p className="text-red-600">
                Taille maximale de l&apos;image de couverture: 4 Mo
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zaffre sm:text-sm sm:leading-6"
                defaultValue={""}
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

          <DialogFooter>
            <button
              type="submit"
              className="bg-gold rounded-lg py-2 px-4 hover:bg-gold-600"
            >
              Créer
            </button>
            <DialogClose asChild>
              <button className="bg-gray-200 rounded-lg py-2 px-4 hover:bg-gray-300">
                Annuler
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
