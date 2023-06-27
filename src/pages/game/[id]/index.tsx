import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { getServerAuthSession } from "@/server/auth";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import PageContainer from "@/components/PageContainer";

export default function GamePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <PageContainer>
      <div className="p-5">
        <h1>Welcome to the game with ID: {props.gameData.id}</h1>
        <pre>{JSON.stringify(props.gameData, null, 4)}</pre>
      </div>
    </PageContainer>
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
      gameData,
    },
  };
}
