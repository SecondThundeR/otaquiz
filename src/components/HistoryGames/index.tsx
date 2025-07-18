import { CardsGrid } from "@/ui/CardsGrid";
import { HistoryCard } from "@/ui/HistoryCard";

import type { RouterOutputs } from "@/utils/trpc/api";

interface HistoryGamesProps {
  host: string | null;
  history: NonNullable<RouterOutputs["history"]["getGameHistory"]>;
  onDelete: (gameId: string) => Promise<void>;
}

export const HistoryGames = ({ host, history, onDelete }: HistoryGamesProps) => {
  const gamesContent = history.map((game) => {
    const { id } = game;
    const onDeleteHandler = () => onDelete(id);

    return <HistoryCard key={id} game={game} host={host} onDelete={onDeleteHandler} />;
  });

  return <CardsGrid>{gamesContent}</CardsGrid>;
};
