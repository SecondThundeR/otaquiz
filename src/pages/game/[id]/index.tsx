import { useState } from "react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { type z } from "zod";
import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";

import ContentContainer from "@/components/ContentContainer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import Screenshot from "@/components/Screenshot";
import Title from "@/components/Title";

import { DBAnimeArraySchema, type DBAnimeSchema } from "@/schemas/db/animes";
import { type DBAnswerArray } from "@/schemas/db/answers";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";
import { shuffleAnswers } from "@/utils/array/shuffleAnswers";

export default function GamePage({
  gameData: { id, animes, amount },
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DBAnswerArray>([]);
  const { data } = api.game.getGameData.useQuery(
    {
      animeIds: animes.map((anime) => anime.id).join(","),
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  const deleteMutation = api.game.deleteGame.useMutation();

  const maxIndex = animes.length - 1;
  const currentAnime = animes.at(currentIndex)!;
  const currentAnimeScreenshots = data?.screenshots.find(
    (data) => data.id === currentAnime.id,
  );
  const currentAnimeDecoys = data?.decoys.slice(
    currentIndex * 3,
    (currentIndex + 1) * 3,
  );

  const onTitle = async () => {
    await deleteMutation.mutateAsync({
      gameId: id,
    });
  };

  const onClick = (anime: z.infer<typeof DBAnimeSchema>) => {
    setAnswers([
      ...answers,
      {
        correct: anime.id !== currentAnime.id ? currentAnime : null,
        picked: anime,
      },
    ]);

    if (currentIndex === maxIndex) return; // Head to results
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
        <Navbar user={user} title="Завершить игру" onTitle={onTitle} />
        <ContentContainer>
          <Title>
            Аниме {currentIndex + 1} из {amount}
          </Title>
          <div className="grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-3">
            {currentAnimeScreenshots?.screenshots.map((screenshot) => (
              <Screenshot key={screenshot.id} src={screenshot.originalUrl} />
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
        </ContentContainer>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // 1. Get game ID and check if it has correct type
  const gameId = ctx.query.id;

  if (gameId === undefined || Array.isArray(gameId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2. Get current session and check if it exists
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

  // 3. Fetch game data for provided game ID and check if game created for session user
  // TODO: Later, when results page will be implemented, check for finished game will be implemented
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

  // Check for finished game and redirect to results page
  // if (gameData.isFinished) {...}

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session.user,
      gameData: {
        ...gameData,
        animes: await DBAnimeArraySchema.parseAsync(
          JSON.parse(gameData.animes),
        ),
      },
    },
  };
}
