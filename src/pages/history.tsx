import { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next/types";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { useGameHistory } from "@/hooks/useGameHistory";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { Subtitle } from "@/ui/Subtitle";
import { Title } from "@/ui/Title";

const DynamicPageLayout = dynamic(
  () => import("../layouts/PageLayout").then((module) => module.PageLayout),
  {
    ssr: false,
  },
);

const DynamicHistoryGames = dynamic(
  () =>
    import("../components/HistoryGames").then((module) => module.HistoryGames),
  {
    ssr: true,
  },
);

const HistoryPage = memo(function HistoryPage({
  user,
  host,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { history, onDelete } = useGameHistory();

  return (
    <>
      <Head>
        <title>История игр</title>
      </Head>
      <DynamicPageLayout user={user}>
        <Title>История игр</Title>
        {!history || history.length === 0 ? (
          <Subtitle>
            История пуста, самое время наполнить её чем-то интересным!
          </Subtitle>
        ) : (
          <DynamicHistoryGames
            host={host}
            history={history}
            onDelete={onDelete}
          />
        )}
      </DynamicPageLayout>
    </>
  );
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session, prisma },
    transformer: superjson,
  });

  await helpers.history.getGameHistory.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session.user,
      host: ctx.req.headers.host ?? null,
    },
  };
}

export default HistoryPage;
