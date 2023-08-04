import { useScrollIntoView } from "@mantine/hooks";
import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import superjson from "superjson";

import { QuestionButtons } from "@/components/QuestionButtons";
import { QuestionScreenshots } from "@/components/QuestionScreenshots";
import { LoadingContainer } from "@/components/ui/LoadingContainer";
import { Subtitle } from "@/components/ui/Subtitle";

import { useGameController } from "@/hooks/useGameController";

import { PageLayout } from "@/layouts/PageLayout";

import { DBAnimeArraySchema } from "@/schemas/db/animes";
import { type DBAnswerAnime, DBAnswerArraySchema } from "@/schemas/db/answers";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { isGameExpired } from "@/utils/server/isGameExpired";
import { isInvalidQuery } from "@/utils/server/isInvalidQuery";

const GamePage = memo(function GamePage({
  gameData: {
    gameId,
    animes,
    animeIds,
    currentAnswers,
    amount,
    currentAnimeIndex,
  },
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(currentAnimeIndex);
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false);

  const {
    data: { screenshots, isLoading, isDeletingGame },
    handlers: { onGameExit, getButtonAnswers, updateAnswers },
  } = useGameController({
    gameId,
    animeIds,
    currentAnswers,
  });

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({});

  const maxIndex = animes.length - 1;
  const currentAnime = animes[currentIndex]!;
  const isFinished = currentIndex === maxIndex;
  const currentAnswerTitle = `${currentIndex + 1} из ${amount}`;
  const currentAnimeScreenshots = screenshots?.find(
    (data) => data.id === currentAnime.id,
  )?.screenshots;
  const currentButtons = getButtonAnswers(currentAnime, currentIndex);

  const onAnswerClick = useCallback(
    async (anime: DBAnswerAnime) => {
      setIsUpdatingAnswer(true);
      await updateAnswers({
        anime,
        currentAnime,
        isFinished,
      });

      if (isFinished) {
        return await router.push(`${router.asPath}/results`);
      }
      setCurrentIndex(currentIndex + 1);
      setIsUpdatingAnswer(false);
      scrollIntoView({
        alignment: "start",
      });
    },
    [
      currentAnime,
      currentIndex,
      isFinished,
      router,
      scrollIntoView,
      updateAnswers,
    ],
  );

  return (
    <>
      <Head>
        <title>{`Игра | Раунд ${currentAnswerTitle}`}</title>
      </Head>
      <PageLayout
        user={user}
        title="Завершить игру"
        onTitle={onGameExit}
        hasFooter={false}
        ref={targetRef}
      >
        {isLoading ? (
          <LoadingContainer>Загружаем необходимые данные</LoadingContainer>
        ) : (
          <>
            <Subtitle>Раунд {currentAnswerTitle}</Subtitle>
            <QuestionScreenshots screenshots={currentAnimeScreenshots} />
            <QuestionButtons
              buttons={currentButtons}
              isDisabled={isUpdatingAnswer || isDeletingGame}
              onAnswerClick={onAnswerClick}
            />
          </>
        )}
      </PageLayout>
    </>
  );
});

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

  if (gameData.userId !== session.user.id) {
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

  const { id, amount, animes, answers, currentAnimeIndex } = gameData;
  const parsedAnimes = await DBAnimeArraySchema.parseAsync(animes);
  const parsedAnswers = answers
    ? await DBAnswerArraySchema.parseAsync(answers)
    : [];

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session.user,
      gameData: {
        gameId: id,
        amount,
        currentAnimeIndex,
        animes: parsedAnimes.map((anime) => {
          return {
            id: anime.id,
            name: anime.name,
          };
        }),
        animeIds: parsedAnimes.map((anime) => anime.id).join(","),
        currentAnswers: parsedAnswers,
      },
    },
  };
}

export default GamePage;
