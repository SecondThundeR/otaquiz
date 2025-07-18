import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import superjson from "superjson";

import { URLCopyButton } from "@/components/URLCopyButton";

import { PAGE_LINK } from "@/constants/pageHeadData";

import { DBAnimeArraySchema } from "@/schemas/db/animes";
import { DBAnswerArraySchema } from "@/schemas/db/answers";

import { appRouter } from "@/server/api/root";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

import { Divider } from "@/ui/Divider";
import { Spinner } from "@/ui/Spinner";
import { Title } from "@/ui/Title";

import { getCorrectAnswersAmount } from "@/utils/game/getCorrectAnswersAmount";
import { getOGImageLink } from "@/utils/pages/getOGImageLink";
import { isInvalidQuery } from "@/utils/server/isInvalidQuery";

const DynamicPageLayout = dynamic(
  () => import("../../../layouts/PageLayout").then((module) => module.PageLayout),
  {
    ssr: false,
  },
);

const DynamicResultHeader = dynamic(
  () => import("../../../components/ResultHeader").then((module) => module.ResultHeader),
  {
    loading: () => <Spinner size="large" />,
    ssr: false,
  },
);

const DynamicResultAnswers = dynamic(
  () => import("../../../components/ResultAnswers").then((module) => module.ResultAnswers),
  {
    loading: () => <Spinner size="large" />,
    ssr: false,
  },
);

const ResultsPage = ({
  user,
  playerData: { userName, id },
  gameData: { amount, animes, answers },
  host,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const playerTitleName = userName ?? "анонима";
  const titleText = `Результат игры ${playerTitleName}`;
  const correctAnswersAmount = getCorrectAnswersAmount(amount, answers);
  const descriptionText = `Правильно отгадано ${correctAnswersAmount} из ${amount} вопросов`;
  const ogImageLink = getOGImageLink(host, id, userName, correctAnswersAmount, amount);

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <meta property="title" content={titleText} />
        <meta property="description" content={descriptionText} />
        <meta property="og:title" content={titleText} />
        <meta property="og:description" content={descriptionText} />
        <meta property="og:image" content={ogImageLink} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={PAGE_LINK} />
        <meta property="twitter:title" content={titleText} />
        <meta property="twitter:description" content={descriptionText} />
        <meta property="twitter:image" content={ogImageLink} />
      </Head>
      <DynamicPageLayout user={user}>
        <Title>Результат игры</Title>
        <DynamicResultHeader
          name={userName}
          amount={amount}
          correctAnswers={correctAnswersAmount}
        />
        <URLCopyButton host={host}>Скопировать ссылку на результат</URLCopyButton>
        <Divider />
        <Title>Детали ответов</Title>
        <DynamicResultAnswers answers={answers} animes={animes} />
      </DynamicPageLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const gameId = ctx.query.id;
  if (isInvalidQuery(gameId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await auth(ctx);
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { session, db },
    transformer: superjson,
  });

  let gameData = null;
  try {
    gameData = await helpers.game.getGameInfo.fetch({
      gameId,
    });
  } catch (error: unknown) {
    console.error(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!gameData?.isFinished)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { amount, animes, answers, userName, shikimoriId } = gameData;
  const parsedAnimes = await DBAnimeArraySchema.parseAsync(animes);
  const parsedAnswers = await DBAnswerArraySchema.parseAsync(answers);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session?.user ?? null,
      playerData: {
        id: shikimoriId ?? null,
        userName,
      },
      gameData: {
        amount,
        animes: parsedAnimes,
        answers: parsedAnswers,
      },
      host: ctx.req.headers.host ?? null,
    },
  };
}

export default ResultsPage;
