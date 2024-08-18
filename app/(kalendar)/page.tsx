import { CalendarAside } from "@/app/(kalendar)/CalendarAside";

export default function Home() {
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
                  {/* Your content */}
                  <p>Content</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="sr-only">
                Prochains évènements
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
