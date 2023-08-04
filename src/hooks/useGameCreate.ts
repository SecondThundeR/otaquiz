import { type TRPCError } from "@trpc/server";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { api } from "@/utils/trpc/api";

export function useGameCreate() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const { mutateAsync, isError } = api.game.createGame.useMutation();

  const onGameCreate = useCallback(
    async (amount: number) => {
      try {
        setIsCreating(true);
        const gameId = await mutateAsync({
          amount,
        });
        return router.push(`/game/${gameId}`);
      } catch (e: unknown) {
        console.log((e as TRPCError).message);
        setIsCreating(false);
      }
    },
    [mutateAsync, router],
  );

  return { onGameCreate, isCreating, isError };
}
