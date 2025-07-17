import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { memo } from "react";

import { useGameCreate } from "@/hooks/useGameCreate";

import { getServerAuthSession } from "@/server/auth";

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
  () => import("../../form/CustomGameForm").then((module) => module.CustomGameForm),
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
        <Subtitle>Настрой необходимые фильтры по которым ты хочешь играть</Subtitle>
        <DynamicCustomGameForm
          isCreating={isCreating}
          isError={isError}
          onGameCreate={onGameCreate}
        />
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
