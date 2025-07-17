import "../dayjs";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppType } from "next/app";
import { JetBrains_Mono } from "next/font/google";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import { useEffect } from "react";

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
  useEffect(() => {
    const setTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", isDark ? "night" : "light");
    };

    setTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", setTheme);

    return () => {
      mediaQuery.removeEventListener("change", setTheme);
    };
  }, []);

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
