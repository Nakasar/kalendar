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

export function NewEventDialog({
  openButton,
}: {
  openButton: React.ReactNode;
}) {
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
              Titre
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
