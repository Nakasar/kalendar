import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/ExcalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default async function BoardPage({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;

  return (
    <div className="bg-white rounded-md">
      <h1 className="text-2xl font-bold">Board {boardId}</h1>

      <div className="w-full h-[calc(100vh-64px)]">
        <ExcalidrawWrapper />
      </div>
    </div>
  );
}
