import { useCallback } from "react";

import { api } from "@/utils/trpc/api";

export function useGameHistory() {
  const utils = api.useUtils();
  const historyQuery = api.history.getGameHistory.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: history } = historyQuery;

  const isEmpty = !history || history.length === 0;

  const { mutateAsync: deleteGame } = api.game.deleteGame.useMutation({
    onMutate: (deletedGameID) => {
      utils.history.getGameHistory.setData(undefined, (prevEntries) => {
        const historyWithoutDeletedEntry = prevEntries?.filter(
          (entry) => entry.id !== deletedGameID.gameId,
        );
        return historyWithoutDeletedEntry;
      });
    },
  });

  const onDelete = useCallback(
    async (gameId: string) => await deleteGame({ gameId }),
    [deleteGame],
  );

  return { history, isEmpty, onDelete };
}
