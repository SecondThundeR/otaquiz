import { createServerSideHelpers } from "@trpc/react-query/server";
import Head from "next/head";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next/types";
import { memo } from "react";
import superjson from "superjson";

import { HistoryGames } from "@/components/HistoryGames";
import { Subtitle } from "@/components/ui/Subtitle";
import { Title } from "@/components/ui/Title";

import { useGameHistory } from "@/hooks/useGameHistory";

import { PageLayout } from "@/layouts/PageLayout";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

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
      <PageLayout user={user}>
        <Title>История игр</Title>
        {!history || history.length === 0 ? (
          <Subtitle>
            История пуста, самое время наполнить её чем-то интересным!
          </Subtitle>
        ) : (
          <HistoryGames host={host} history={history} onDelete={onDelete} />
        )}
      </PageLayout>
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
