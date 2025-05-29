import Link from "next/link";

export default function BoardsPage() {
  return (
    <div className="rounded-md bg-white">
      <h1 className="text-2xl font-bold">Boards Page</h1>

      <Link href="/boards/toto">Go to board</Link>
    </div>
  );
}
