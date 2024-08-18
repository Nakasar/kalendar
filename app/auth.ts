import NextAuth, { DefaultSession } from "next-auth";
import { createUser, getUserByEmail } from "@/app/lib/users";
import authConfig from "@/app/auth.config";
import { nanoid } from "nanoid";

declare module "next-auth" {
  interface Session {
    user: {
      permissions: string[];
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, user }) {
      let dbUser = await getUserByEmail(session.user.email);
      if (!dbUser) {
        dbUser = await createUser({
          id: nanoid(),
          email: session.user.email,
          permissions: [],
          isAdmin: false,
        });
      }

      session.user.permissions = dbUser.permissions ?? [];
      session.user.isAdmin = dbUser.isAdmin;
      session.user.id = dbUser.id;

      return session;
    },
  },
  ...authConfig,
});
