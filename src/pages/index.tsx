import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { memo } from "react";

import { AmountStepper } from "@/components/AmountStepper";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { Subtitle } from "@/components/ui/Subtitle";
import { Title } from "@/components/ui/Title";

import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/constants/pageHeadData";

import { useAmount } from "@/hooks/useAmount";
import { useGameCreate } from "@/hooks/useGameCreate";

import { PageLayout } from "@/layouts/PageLayout";

import { getServerAuthSession } from "@/server/auth";

const HomePage = memo(function HomePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { amount, increment, decrement } = useAmount({
    min: 5,
    max: 50,
    step: 5,
  });
  const { onGameCreate, isCreating, isError } = useGameCreate();

  const onClick = () => onGameCreate(amount);

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout user={user}>
        {!user ? (
          <Alert type="info">
            На данный момент, игры для анонимных пользователей не поддерживаются
            <br />
            Войдите, пожалуйста, в свой аккаунт Шикимори, чтобы продолжить
          </Alert>
        ) : (
          <>
            <Title>Привет!</Title>
            <Subtitle>Выбери количество аниме для игры</Subtitle>
            <AmountStepper
              amount={amount}
              increment={increment}
              decrement={decrement}
            />
            <Button size="lg" disabled={isCreating} onClick={onClick}>
              {isCreating ? (
                <>
                  <Spinner />
                  Создание игры
                </>
              ) : (
                "Начать игру"
              )}
            </Button>
            {isError && (
              <Alert type="error">
                Не удалось создать игру! Попробуй еще раз или напиши
                разработчику на Github
              </Alert>
            )}
          </>
        )}
      </PageLayout>
    </>
  );
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  return {
    props: {
      user: session ? session.user : null,
    },
  };
}

export default HomePage;
