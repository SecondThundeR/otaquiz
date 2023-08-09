import { memo } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";

import { AmountStepper } from "@/components/AmountStepper";

import { PAGE_TITLE } from "@/constants/pageHeadData";

import { useAmount } from "@/hooks/useAmount";
import { useGameCreate } from "@/hooks/useGameCreate";

import { PageLayout } from "@/layouts/PageLayout";

import { getServerAuthSession } from "@/server/auth";

import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";
import { Divider } from "@/ui/Divider";
import { LinkButton } from "@/ui/LinkButton";
import { Spinner } from "@/ui/Spinner";
import { Subtitle } from "@/ui/Subtitle";
import { Title } from "@/ui/Title";

const HomePage = memo(function HomePage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { amount, increment, decrement } = useAmount({
    min: 5,
    max: 50,
    step: 5,
  });
  const { onGameCreate, isCreating, isError } = useGameCreate();

  const onClick = () =>
    onGameCreate({
      limit: amount,
      kind: "!music",
      score: 7,
      rating: "!rx",
    });

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
      </Head>
      <PageLayout user={user} isHome>
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
            <div className="flex flex-col gap-2">
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
              <Divider>или</Divider>
              <LinkButton to="/game/custom" size="lg">
                Кастомизировать игру
              </LinkButton>
            </div>
            {isError && (
              <Alert type="error">
                <strong>Не удалось создать игру!</strong>
                <br />
                Попробуй еще раз или напиши разработчику на Github
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
