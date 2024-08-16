import background from './background.png';
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate min-h-full">
      <Image
        alt=""
        src={background}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />
    </main>
  );
}
