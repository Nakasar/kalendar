import Image from "next/image";
import Link from "next/link";

import background from "./background.png";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <Image
        alt=""
        src={background}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />

      <div className="rounded-full bg-white bg-opacity-80 p-16 text-center">
        <p className="text-base font-semibold text-it-orange-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hic sunt dracones
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Votre aventure vous a mené-e en territoire inconnu car cette page ne
          semble pas exister.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-zaffre-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zaffre-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zaffre-600"
          >
            Retournons en lieu sûr!
          </Link>
        </div>
      </div>
    </main>
  );
}
