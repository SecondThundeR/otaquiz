import { Head, Html, Main, NextScript } from "next/document";

import { PAGE_DESCRIPTION } from "@/constants/pageHeadData";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={PAGE_DESCRIPTION} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
