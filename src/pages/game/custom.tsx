import { memo } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

import { useGameCreate } from "@/hooks/useGameCreate";

import { getServerAuthSession } from "@/server/auth";

import { Alert } from "@/ui/Alert";
import { Spinner } from "@/ui/Spinner";
import { Subtitle } from "@/ui/Subtitle";
import { Title } from "@/ui/Title";

const DynamicPageLayout = dynamic(
  () => import("../../layouts/PageLayout").then((module) => module.PageLayout),
  {
    ssr: false,
  },
);

const DynamicCustomGameForm = dynamic(
  () =>
    import("../../form/CustomGameForm").then((module) => module.CustomGameForm),
  {
    loading: () => <Spinner size="large" />,
    ssr: false,
  },
);

const CustomGame = memo(function CustomGame({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { onGameCreate, isCreating, isError } = useGameCreate();

  return (
    <>
      <Head>
        <title>Создать кастомную игру</title>
      </Head>
      <DynamicPageLayout user={user}>
        <Title>Настраиваемая игра</Title>
        <Subtitle>
          Настрой необходимые фильтры по которым ты хочешь играть
        </Subtitle>
        <DynamicCustomGameForm
          isCreating={isCreating}
          onGameCreate={onGameCreate}
        />
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
      </DynamicPageLayout>
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
