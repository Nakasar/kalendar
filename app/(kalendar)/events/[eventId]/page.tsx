import { getEvent } from "@/app/lib/events";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Clock1Icon } from "lucide-react";
import { DateTime } from "luxon";

export default async function ({ params }: { params: { eventId: string } }) {
  const event = await getEvent(params.eventId);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Evènement {event.title}</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="sr-only">
                Fiche de l&apos;évènement
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-semibold">{event.title}</h3>

                  <h4 className="text-md font-semibold">Description</h4>
                  <p>{event.description}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                Détails
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="aspect-video w-full bg-gray-400"></div>

                <div className="p-4">
                  <div className="flex flex-row gap-2 text-gray-400">
                    <MapPinIcon className="size-5 self-center" />
                    <p>{event.location}</p>
                  </div>

                  <div className="flex flex-row gap-2 text-gray-600">
                    <Clock1Icon className="size-5 self-center" />
                    <p className="">
                      Début :{" "}
                      <time dateTime={event.start}>
                        {DateTime.fromISO(event.start, {
                          locale: "fr",
                        })
                          .setZone("utc+2")
                          .toLocaleString({
                            ...DateTime.DATETIME_FULL,
                            timeZoneName: undefined,
                          })}
                      </time>
                    </p>
                  </div>

                  <div className="flex flex-row gap-2 text-gray-600">
                    <Clock1Icon className="size-5 self-center" />
                    <p className="">
                      Fin :{" "}
                      <time dateTime={event.end}>
                        {DateTime.fromISO(event.end, {
                          locale: "fr",
                        })
                          .setZone("utc+2")
                          .toLocaleString({
                            ...DateTime.DATETIME_FULL,
                            timeZoneName: undefined,
                          })}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
