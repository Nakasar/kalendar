import { signIn } from "@/app/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <button
        type="submit"
        className="bg-gold text-black rounded-md px-4 py-2 hover:bg-gold-600"
      >
        Connexion
      </button>
    </form>
  );
}
