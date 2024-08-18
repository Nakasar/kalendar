import { CalendarAside } from "@/app/(kalendar)/CalendarAside";
import { getNextEvents } from "@/app/lib/events";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Clock1Icon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const nextEvents = await getNextEvents();

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Accueil</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="sr-only">
                Dernières nouvelles
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold">
                    Prochains évènements
                  </h3>

                  <ul className="space-y-4 pt-4">
                    {nextEvents.map((event) => (
                      <li
                        key={event.id}
                        className="px-2 py-4 border-2 border-gray-300 shadow-md rounded-md"
                      >
                        <div className="flex space-x-3">
                          <div className="flex-1 space-y-1">
                            {event.cover && (
                              <Image
                                alt="Illustration de l'évènement"
                                className="aspect-video w-full bg-gray-400 object-cover rounded-md"
                                src={event.cover}
                                width={200}
                                height={200}
                              />
                            )}
                            <Link href={`/events/${event.id}`}>
                              <h4 className="text-lg font-semibold hover:text-gray-600">
                                {event.title}
                              </h4>
                            </Link>

                            <div className="flex flex-row gap-2">
                              <MapPinIcon className="size-5 self-center" />
                              <p className="text-gray-400">{event.location}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                              <Clock1Icon className="size-5 self-center" />
                              <p className="text-gray-600">
                                <time dateTime={event.start}>
                                  {DateTime.fromISO(event.start, {
                                    locale: "fr",
                                  }).toLocaleString(DateTime.DATE_FULL)}
                                </time>{" "}
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
                            <p className="text-gray-600 line-clamp-3">
                              {event.description}
                            </p>
                            <div className="pt-4">
                              <Link
                                href={`/events/${event.id}`}
                                className="px-4 py-2 border-2 border-gray-500 rounded-md"
                              >
                                Détails
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                Evènements
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <CalendarAside />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
