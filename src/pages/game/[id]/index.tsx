import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import superjson from "superjson";

import { useGameController } from "@/hooks/useGameController";
import { useGameState } from "@/hooks/useGameState";

import { DBAnimeArraySchema } from "@/schemas/db/animes";
import { DBAnswerArraySchema } from "@/schemas/db/answers";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { Spinner } from "@/ui/Spinner";
import { Subtitle } from "@/ui/Subtitle";

import { isGameExpired } from "@/utils/server/isGameExpired";
import { isInvalidQuery } from "@/utils/server/isInvalidQuery";

const DynamicPageLayout = dynamic(
  () => import("../../../layouts/PageLayout").then((module) => module.PageLayout),
  {
    ssr: false,
  },
);

const DynamicQuestionScreenshots = dynamic(
  () =>
    import("../../../components/QuestionScreenshots").then((module) => module.QuestionScreenshots),
  {
    loading: () => <Spinner size="large" />,
    ssr: false,
  },
);

const DynamicQuestionButtons = dynamic(
  () => import("../../../components/QuestionButtons").then((module) => module.QuestionButtons),
  {
    loading: () => <Spinner size="large" />,
    ssr: false,
  },
);

const GamePage = ({
  gameData: {
    gameId,
    animes,
    animeIds,
    currentAnswers,
    isShowingResult,
    amount,
    currentAnimeIndex,
  },
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    data: { screenshots, isDeleting, isUpdating },
    handlers: { onGameExit, getButtonAnswers, updateAnswers },
  } = useGameController({
    gameId,
    animeIds,
    currentAnswers,
  });
  const {
    data: {
      correctButtonID,
      currentAnswerTitle,
      currentAnimeScreenshots,
      currentButtons,
      isButtonsDisabled,
      isSavingResult,
    },
    handlers: { onAnswerClick },
  } = useGameState({
    animes,
    currentAnimeIndex,
    amount,
    isShowingResult,
    screenshots,
    isDeleting,
    isUpdating,
    getButtonAnswers,
    updateAnswers,
  });

  return (
    <>
      <Head>
        <title>{`Игра | Раунд ${currentAnswerTitle}`}</title>
      </Head>
      <DynamicPageLayout
        user={user}
        title="Завершить игру"
        onClick={onGameExit}
        hasFooter={false}
        hasDropdown={false}
        isButtonDisabled={isSavingResult}
      >
        <Subtitle>
          Раунд {currentAnswerTitle} {isSavingResult && "| Идет сохранение ответов"}
        </Subtitle>
        <DynamicQuestionScreenshots screenshots={currentAnimeScreenshots} />
        <DynamicQuestionButtons
          buttons={currentButtons}
          isDisabled={isButtonsDisabled}
          correctButtonID={isShowingResult && correctButtonID}
          onAnswerClick={onAnswerClick}
        />
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

  // TODO: Currently there is no support for anonymous games. Will be implemented later
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

  if (gameData?.userId !== session.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (gameData.isFinished)
    return {
      redirect: {
        destination: `/game/${gameData.id}/results`,
        permanent: true,
      },
    };

  if (isGameExpired(gameData.updatedAt)) {
    await prisma.game.delete({
      where: {
        id: gameData.id,
      },
    });

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { id, amount, animes, answers, currentAnimeIndex, isShowingResult } = gameData;
  const parsedAnimes = await DBAnimeArraySchema.parseAsync(animes);
  const parsedAnswers = answers ? await DBAnswerArraySchema.parseAsync(answers) : [];
  const animeIds = parsedAnimes.map((anime) => anime.id).join(",");

  await helpers.anime.getAnimeScreenshots.prefetch({ animeIds });
  await helpers.anime.getAnswerDecoys.prefetch({ animeIds });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session.user,
      gameData: {
        gameId: id,
        amount,
        currentAnimeIndex,
        isShowingResult,
        animes: parsedAnimes.map(({ id, name }) => ({ id, name })),
        animeIds,
        currentAnswers: parsedAnswers,
      },
    },
  };
}

export default GamePage;
