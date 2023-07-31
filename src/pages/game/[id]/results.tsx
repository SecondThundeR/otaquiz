import { createServerSideHelpers } from "@trpc/react-query/server";
import cn from "classnames";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { memo } from "react";
import superjson from "superjson";

import ContentContainer from "@/components/ContentContainer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import Screenshot from "@/components/Screenshot";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { FooterInfo } from "@/components/ui/FooterInfo";
import { DBAnimeArraySchema } from "@/schemas/db/animes";
import { DBAnswerArraySchema } from "@/schemas/db/answers";
import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { getCorrectAnswersAmount } from "@/utils/game/getCorrectAnswersAmount";

const ResultsPage = memo(function ResultsPage({
  gameData: { amount, animes, answers },
  user,
  playerInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const correctAnswersAmount = getCorrectAnswersAmount(amount, answers);

  return (
    <>
      <Head>
        <title>Otaquiz | Результат игры</title>
      </Head>
      <PageContainer>
        <Navbar user={user} />
        <ContentContainer>
          <Title>Результаты игры</Title>
          <div className="flex items-center gap-2">
            <div className="avatar btn btn-circle btn-ghost">
              <div className="w-9 rounded-full">
                <Image
                  width={36}
                  height={36}
                  src={playerInfo?.image ?? ""}
                  alt="Аватар аккаунта"
                />
              </div>
            </div>
            <Subtitle>
              <a
                href={`https://shikimori.me/${playerInfo?.name}`}
                className="link-hover link-primary link"
              >
                {playerInfo?.name}
              </a>{" "}
              выбрал(а) правильно {correctAnswersAmount} из {amount} аниме
            </Subtitle>
          </div>
          <div className="divider"></div>
          <Title>Детали ответов:</Title>
          <div className="mt-4 grid w-full grid-cols-3 gap-4">
            {answers?.map((answer, i) => {
              const correctAnimeID = answer.correct?.id ?? answer.picked.id;
              const isCorrectPicked = !answer.correct;
              const titleResult = isCorrectPicked
                ? {
                    text: "(Правильно)",
                    class: "text-success",
                  }
                : {
                    text: "(Неправильно)",
                    class: "text-error",
                  };
              const currentScreenshotURL = animes.find(
                (anime) => anime.id === correctAnimeID,
              )?.screenshotUrl;

              return (
                <div
                  key={i}
                  className="min-h-8 flex w-full flex-col gap-4 rounded-xl border-2 border-base-content px-6 py-5"
                >
                  {currentScreenshotURL && (
                    <Screenshot src={currentScreenshotURL} />
                  )}
                  <div className="flex flex-col gap-2">
                    <h2 className="card-title">
                      Вопрос: {i + 1} из {amount}
                      <p className={titleResult.class}>{titleResult.text}</p>
                    </h2>
                    <p>
                      Выбрано:{" "}
                      <a
                        href={`https://shikimori.me/animes/${answer.picked.id}`}
                        className={cn("link-hover link-primary link", {
                          "line-through": !isCorrectPicked,
                        })}
                      >
                        {answer.picked.name}
                      </a>
                    </p>
                    {answer.correct && (
                      <p>
                        Ответ:{" "}
                        <a
                          href={`https://shikimori.me/animes/${answer.correct.id}`}
                          className="link-hover link-primary link"
                        >
                          {answer.correct.name}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ContentContainer>
        <FooterInfo />
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

  const session = await getServerAuthSession(ctx);
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

  if (!gameData.isFinished)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { amount, animes, answers } = gameData;
  const playerInfo = await prisma.user.findUnique({
    where: {
      id: gameData.userId,
    },
  });
  const parsedAnimes = await DBAnimeArraySchema.parseAsync(JSON.parse(animes));
  const parsedAnswers = await DBAnswerArraySchema.parseAsync(
    JSON.parse(answers!),
  );

  return {
    props: {
      trpcState: helpers.dehydrate(),
      user: session?.user ?? null,
      playerInfo,
      gameData: {
        amount,
        animes: parsedAnimes,
        answers: parsedAnswers,
      },
    },
  };
}

export default ResultsPage;
