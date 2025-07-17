import { memo } from "react";

import { DeleteButton } from "@/components/DeleteButton";
import { Screenshot } from "@/components/Screenshot";
import { URLCopyButton } from "@/components/URLCopyButton";
import dayjs from "@/dayjs";
import type { DBAnimeArray } from "@/schemas/db/animes";
import type { DBAnswerArray } from "@/schemas/db/answers";
import { getCorrectAnswersAmount } from "@/utils/game/getCorrectAnswersAmount";
import type { RouterOutputs } from "@/utils/trpc/api";

import { ButtonsGrid } from "../ButtonsGrid";
import { CardContainer } from "../CardContainer";
import { GuessedAmount } from "../GuessedAmount";
import { Link } from "../Link";

interface HistoryCardProps {
  host: string | null;
  game: NonNullable<RouterOutputs["history"]["getGameHistory"]>[number];
  onDelete: () => void;
}

export const HistoryCard = memo(function HistoryCard({ host, game, onDelete }: HistoryCardProps) {
  const { id, amount, answers, animes, createdAt } = game;
  const formattedDate = `Игра от ${dayjs(createdAt).format("DD.MM.YYYY в HH:mm")}`;
  const resultsPath = `/game/${id}/results`;
  const screenshotUrl = (animes as DBAnimeArray)[0]?.screenshotUrl;
  const correctAnswers = getCorrectAnswersAmount(amount, answers as DBAnswerArray);

  return (
    <CardContainer>
      <Screenshot src={screenshotUrl} />
      <div className="flex flex-col gap-2">
        <h2 className="card-title">
          <Link style="primary" to={resultsPath}>
            {formattedDate ?? "Игра от ..."}
          </Link>
        </h2>
        <p>Количество раундов: {amount}</p>
        <p>
          Отгадано: <GuessedAmount correct={correctAnswers} amount={amount} />
        </p>
      </div>
      <ButtonsGrid>
        <URLCopyButton host={host} path={resultsPath}>
          Скопировать ссылку
        </URLCopyButton>
        <DeleteButton onDelete={onDelete} />
      </ButtonsGrid>
    </CardContainer>
  );
});
