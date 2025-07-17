import type { TRPCError } from "@trpc/server";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { api, type RouterInputs } from "@/utils/trpc/api";

type UseGameCreateOptions = RouterInputs["game"]["createGame"]["options"];

export function useGameCreate() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const { mutateAsync, isError } = api.game.createGame.useMutation();

  const onGameCreate = useCallback(
    async (options: UseGameCreateOptions) => {
      try {
        setIsCreating(true);
        const gameId = await mutateAsync({ options });
        await router.push(`/game/${gameId}`);
      } catch (error: unknown) {
        console.error((error as TRPCError).message);
        setIsCreating(false);
      }
    },
    [mutateAsync, router],
  );

  return { onGameCreate, isCreating, isError };
}
