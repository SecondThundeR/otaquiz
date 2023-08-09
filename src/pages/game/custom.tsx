import { memo } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";

import { useGameCreate } from "@/hooks/useGameCreate";

import { PageLayout } from "@/layouts/PageLayout";

import { getServerAuthSession } from "@/server/auth";

import { Alert } from "@/ui/Alert";
import { Subtitle } from "@/ui/Subtitle";

import { CustomGameForm } from "@/form/CustomGameForm";

const CustomGame = memo(function CustomGame({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { onGameCreate, isCreating, isError } = useGameCreate();

  return (
    <>
      <Head>
        <title>Создать кастомную игру</title>
      </Head>
      <PageLayout user={user}>
        <Subtitle>Настройка кастомной игры</Subtitle>
        <CustomGameForm isCreating={isCreating} onGameCreate={onGameCreate} />
        {isError && (
          <Alert type="error">
            <strong>Не удалось создать игру!</strong>
            <br />
            Скорее всего не удалось найти достаточное количество аниме с
            текущими настройками
            <br />
            Попробуй еще раз с другими настройками или напиши разработчику на
            Github, если ошибка повторяется при любых настройках
          </Alert>
        )}
      </PageLayout>
    </>
  );
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
}

export default CustomGame;
