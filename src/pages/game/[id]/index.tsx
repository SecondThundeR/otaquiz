import { useEffect, useState } from "react";
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
import { type DBAnswerArraySchema } from "@/schemas/db/answers";
import { ScreenshotSchema } from "@/schemas/screenshot";

import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";

import { api } from "@/utils/api";
import { shuffleArray } from "@/utils/array";

export default function GamePage({
  gameData,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<z.infer<typeof DBAnswerArraySchema>>(
    []
  );
  const [screenshots, setScreenshots] =
    useState<z.infer<typeof ScreenshotSchema>[]>();

  const animes = DBAnimeArraySchema.parse(JSON.parse(gameData.animes));
  const maxIndex = animes.length - 1;
  const currentAnime = animes.at(currentIndex) as z.infer<typeof DBAnimeSchema>;

  const { data: randomAnimes } = api.game.getRandomAnimes.useQuery(
    {
      animeId: currentAnime.id,
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const abortMutation = api.game.abortGame.useMutation();

  const onTitle = async () => {
    await abortMutation.mutateAsync({
      gameId: gameData.id,
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

  useEffect(() => {
    (async () => {
      const animesUrl = new URL(
        `animes/${currentAnime.id}/screenshots`,
        "https://shikimori.me/api/"
      );
      const res = await fetch(animesUrl);
      const data = await ScreenshotSchema.array().parseAsync(await res.json());
      setScreenshots(data);
    })().catch(console.error);
  }, [currentAnime]);

  return (
    <>
      <Head>
        <title>
          AniGuessr | Аниме {currentIndex + 1} из {gameData.amount}
        </title>
      </Head>
      <PageContainer>
        <Navbar user={user} title="Завершить игру" onTitle={onTitle} />
        <ContentContainer>
          <Title>
            Аниме {currentIndex + 1} из {gameData.amount}
          </Title>
          <div className="grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-3">
            {screenshots !== undefined &&
              screenshots
                .slice(0, 6)
                .map((screenshot, i) => (
                  <Screenshot
                    key={i}
                    src={`https://shikimori.me/${screenshot.original}`}
                    blurSrc={`https://shikimori.me/${screenshot.preview}`}
                  />
                ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {randomAnimes !== undefined &&
              shuffleArray([currentAnime, ...randomAnimes]).map((anime) => (
                <button
                  key={anime.id}
                  className="btn-primary btn"
                  onClick={() => onClick(anime)}
                >
                  {anime.name}
                </button>
              ))}
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
    gameData = await helpers.game.getGame.fetch({
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

  if (gameData.isAborted)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

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
      gameData,
    },
  };
}
