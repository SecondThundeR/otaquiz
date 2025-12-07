import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import { env } from "@/env";
import ShikimoriProvider from "@/providers/shikimori";
import { db } from "@/server/db";
import { accounts, sessions, users, verificationTokens } from "../db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    ShikimoriProvider({
      clientId: env.SHIKIMORI_CLIENT_ID,
      clientSecret: env.SHIKIMORI_CLIENT_SECRET,
      checks: ["none"],
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
