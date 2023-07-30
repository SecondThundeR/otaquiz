import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import superjson from "superjson";

import ContentContainer from "@/components/ContentContainer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";
import Screenshot from "@/components/Screenshot";
import Subtitle from "@/components/Subtitle";
import { TEN_MINUTES } from "@/constants/time";
import { type DBAnime, DBAnimeArraySchema } from "@/schemas/db/animes";
import { type DBAnswerArray, DBAnswerArraySchema } from "@/schemas/db/answers";
import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { shuffleAnswers } from "@/utils/array/shuffleAnswers";

const GamePage = memo(function GamePage({
  gameData: { id, animes, currentAnswers, amount, currentAnimeIndex },
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(currentAnimeIndex);
  const [answers, setAnswers] = useState<DBAnswerArray>(currentAnswers ?? []);
  const { data, isLoading } = api.game.getGameData.useQuery(
    {
      animeIds: animes.map((anime) => anime.id).join(","),
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  const updateAnswersMutation = api.game.updateAnswers.useMutation();
  const deleteMutation = api.game.deleteGame.useMutation();

  const maxIndex = animes.length - 1;
  const currentAnime = animes.at(currentIndex)!;
  const isGameFinished = currentIndex === maxIndex;
  const currentAnimeScreenshots = data?.screenshots.find(
    (data) => data.id === currentAnime.id,
  );
  const currentAnimeDecoys = data?.decoys.slice(
    currentIndex * 3,
    (currentIndex + 1) * 3,
  );

  const onBack = async () => {
    await deleteMutation.mutateAsync({
      gameId: id,
    });
  };

  const onClick = async (anime: DBAnime) => {
    const newAnswers = [
      ...answers,
      {
        correct: anime.id !== currentAnime.id ? currentAnime : null,
        picked: anime,
      },
    ];

    setAnswers(newAnswers);
    await updateAnswersMutation.mutateAsync({
      gameId: id,
      answers: newAnswers,
      isFinished: isGameFinished,
    });

    if (isGameFinished) {
      return await router.push(`${router.asPath}/results`);
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <Head>
        <title>
          AniGuessr | Аниме {currentIndex + 1} из {amount}
        </title>
      </Head>
      <PageContainer>
        <Navbar user={user} title="Завершить игру" onTitle={onBack} />
        <ContentContainer>
          {isLoading ? (
            <PageLoadingPlaceholder>
              Загружаем необходимые данные
            </PageLoadingPlaceholder>
          ) : (
            <>
              <Subtitle>
                {currentIndex + 1} из {amount}
              </Subtitle>
              <div className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {currentAnimeScreenshots?.screenshots.map((screenshot) => (
                  <Screenshot
                    key={screenshot.id}
                    src={screenshot.originalUrl}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {currentAnimeDecoys &&
                  shuffleAnswers([currentAnime, ...currentAnimeDecoys]).map(
                    (anime) => (
                      <button
                        key={anime.id}
                        className="btn btn-primary"
                        onClick={() => onClick(anime)}
                      >
                        {anime.name}
                      </button>
                    ),
                  )}
              </div>
            </>
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const gameId = ctx.query.id;

  if (gameId === undefined || Array.isArray(gameId)) {
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
  } catch (e: unknown) {
    console.log(e);
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

  if (Date.now() - gameData.updatedAt.getTime() > TEN_MINUTES) {
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

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session.user,
      gameData: {
        id,
        amount,
        currentAnimeIndex,
        animes: await DBAnimeArraySchema.parseAsync(JSON.parse(animes)),
        currentAnswers: answers
          ? await DBAnswerArraySchema.parseAsync(JSON.parse(answers))
          : null,
      },
    },
  };
}

export default GamePage;
