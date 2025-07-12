import { Head, Html, Main, NextScript } from "next/document";

import {
  PAGE_DESCRIPTION,
  PAGE_LINK,
  PAGE_TITLE,
} from "@/constants/pageHeadData";

export default function Document() {
  return (
    <Html lang="ru" data-theme="night">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_LINK} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
