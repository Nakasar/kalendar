import { auth } from "@/app/auth";
import { getRumors } from "@/lib/rumors";
import { marked } from "marked";
import { DeleteRumor } from "@/app/(kalendar)/rumeurs/components";

export async function RumorsPage() {
  const session = await auth();

  // Simulate fetching rumors data
  const rumors = await getRumors();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 bg-white shadow rounded-lg py-4">
      <h1 className="text-2xl font-bold">Rumeurs</h1>

      <p className="text-gray-600 mb-4">
        Bienvenue sur la page des rumeurs. Ici, vous pouvez consulter les
        dernières rumeurs partagées par la communauté.
      </p>

      <ul className="space-y-4">
        {rumors.map((rumor) => (
          <li key={rumor._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <div
              className="prose text-gray-800"
              dangerouslySetInnerHTML={{
                __html: marked.parse(rumor.text),
              }}
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-500 mt-2">
                Par {rumor.author} le{" "}
                {new Date(rumor.createdAt).toLocaleDateString()}
              </p>
              <div>
                {session?.user?.isAdmin && <DeleteRumor rumorId={rumor._id} />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
