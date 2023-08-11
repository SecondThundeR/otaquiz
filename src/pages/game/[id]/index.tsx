import { memo, useCallback, useState } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLocalStorage, useScrollIntoView } from "@mantine/hooks";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { QuestionButtons } from "@/components/QuestionButtons";
import { QuestionScreenshots } from "@/components/QuestionScreenshots";

import { useDetectSafari } from "@/hooks/useDetectSafari";
import { useGameController } from "@/hooks/useGameController";

import { PageLayout } from "@/layouts/PageLayout";

import { DBAnimeArraySchema } from "@/schemas/db/animes";
import { DBAnswerArraySchema, type DBAnswerAnime } from "@/schemas/db/answers";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Subtitle } from "@/ui/Subtitle";

import { asyncTimeout } from "@/utils/general/asyncTimeout";
import { isGameExpired } from "@/utils/server/isGameExpired";
import { isInvalidQuery } from "@/utils/server/isInvalidQuery";

const GamePage = memo(function GamePage({
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [correctButtonID, setCorrectButtonID] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(currentAnimeIndex);
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false);

  const {
    data: { screenshots, isLoading },
    handlers: { onGameExit, getButtonAnswers, updateAnswers },
  } = useGameController({
    gameId,
    animeIds,
    currentAnswers,
  });
  const isSafari = useDetectSafari();
  const [isDismissed, setIsDismissed] = useLocalStorage({
    key: "safari-note-dismiss",
    defaultValue: false,
  });
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    duration: 425,
  });

  const maxIndex = animes.length - 1;
  const currentAnime = animes[currentIndex]!;
  const isFinished = currentIndex === maxIndex;
  const currentAnswerTitle = `${currentIndex + 1} из ${amount}`;
  const currentAnimeScreenshots = screenshots?.find(
    (data) => data.id === currentAnime.id,
  )?.screenshots;
  const currentButtons = getButtonAnswers(currentAnime, currentIndex);

  const onNoteDismiss = () => {
    setIsDismissed(true);
  };

  const onAnswerClick = useCallback(
    async (anime: DBAnswerAnime) => {
      if (isShowingResult) {
        setCorrectButtonID(currentAnime.id);
        await asyncTimeout(1500);
        setCorrectButtonID(null);
      }
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
      scrollIntoView();
    },
    [
      currentAnime,
      currentIndex,
      isFinished,
      isShowingResult,
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
        onClick={onGameExit}
        hasFooter={false}
        hasDropdown={false}
        ref={targetRef}
      >
        {isSafari && !isDismissed && (
          <Alert type="info">
            <strong>Имеются проблемы с браузером Safari</strong>
            <br />
            К сожалению, данный браузер не позволяет выполнять сохранение
            вопросов, если происходит перезагрузка страницы
            <br />
            Имейте это ввиду при игре и не читерите!
            <div className="mt-2">
              <Button style="neutral" size="block" onClick={onNoteDismiss}>
                Закрыть
              </Button>
            </div>
          </Alert>
        )}
        <Subtitle>Раунд {currentAnswerTitle}</Subtitle>
        <QuestionScreenshots screenshots={currentAnimeScreenshots} />
        <QuestionButtons
          buttons={currentButtons}
          isDisabled={isLoading || isUpdatingAnswer}
          correctButtonID={isShowingResult && correctButtonID}
          onAnswerClick={onAnswerClick}
        />
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

  const { id, amount, animes, answers, currentAnimeIndex, isShowingResult } =
    gameData;
  const parsedAnimes = await DBAnimeArraySchema.parseAsync(animes);
  const parsedAnswers = answers
    ? await DBAnswerArraySchema.parseAsync(answers)
    : [];
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
        animes: parsedAnimes.map((anime) => {
          return {
            id: anime.id,
            name: anime.name,
          };
        }),
        animeIds,
        currentAnswers: parsedAnswers,
      },
    },
  };
}

export default GamePage;
