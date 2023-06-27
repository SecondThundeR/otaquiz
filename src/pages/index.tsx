import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { type TRPCError } from "@trpc/server";

import Alert from "@/components/Alert";
import AmountStepper from "@/components/AmountStepper";
import ContentContainer from "@/components/ContentContainer";
import {
  Footer,
  FooterLink,
  FooterSeparator,
  FooterText,
} from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageContainer from "@/components/PageContainer";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";

import useAmount from "@/hooks/useAmount";

import { getServerAuthSession } from "@/server/auth";

import { api } from "@/utils/api";

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { amount, increment, decrement } = useAmount({
    min: 5,
    max: 50,
    step: 5,
  });

  const gameMutation = api.game.createGame.useMutation();

  const onCreate = async () => {
    try {
      const gameId = await gameMutation.mutateAsync({
        amount,
      });
      return router.push(`/game/${gameId}`);
    } catch (e: unknown) {
      console.log((e as TRPCError).message);
    }
  };

  return (
    <>
      <Head>
        <title>AniGuessr</title>
        <meta name="description" content="Anime Quiz Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Navbar user={user} />
        <ContentContainer>
          {user === null ? (
            <Alert state="info">
              На данный момент, игры для анонимных пользователей не
              поддерживаются
              <br />
              Войдите, пожалуйста, в свой аккаунт Шикимори, чтобы продолжить
            </Alert>
          ) : (
            <>
              <Title>Привет!</Title>
              <Subtitle>Выберите количество аниме для игры:</Subtitle>
              <AmountStepper
                amount={amount}
                increment={increment}
                decrement={decrement}
              />

              <button
                className={`btn-primary btn-lg btn`}
                disabled={gameMutation.isLoading}
                onClick={onCreate}
              >
                {gameMutation.isLoading && (
                  <span className="loading loading-spinner"></span>
                )}
                {gameMutation.isLoading ? "Создание игры" : "Начать игру"}
              </button>
              {gameMutation.isError && (
                <Alert state="error">
                  Не удалось загрузить данные об аниме! Попробуйте еще раз :c
                </Alert>
              )}
            </>
          )}
        </ContentContainer>
        <Footer>
          <FooterText>
            Powered by{" "}
            <FooterLink link="https://shikimori.me/api/doc/">
              Shikimori API
            </FooterLink>
          </FooterText>
          <FooterSeparator />
          <FooterText>
            Made by{" "}
            <FooterLink link="https://github.com/SecondThundeR/">
              SecondThundeR
            </FooterLink>
          </FooterText>
        </Footer>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
