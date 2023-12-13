import { type AppType } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import { api } from "@/utils/trpc/api";

const font = JetBrains_Mono({
  display: "swap",
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
      <SpeedInsights />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
