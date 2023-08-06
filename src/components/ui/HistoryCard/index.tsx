import { DateTime } from "luxon";
import { memo } from "react";

import { type DBAnimeArray } from "@/schemas/db/animes";
import { type DBAnswerArray } from "@/schemas/db/answers";

import { getCorrectAnswersAmount } from "@/utils/game/getCorrectAnswersAmount";
import { type RouterOutputs } from "@/utils/trpc/api";

import { DeleteButton } from "../../DeleteButton";
import { Screenshot } from "../../Screenshot";
import { URLCopyButton } from "../../URLCopyButton";
import { ButtonsGrid } from "../ButtonsGrid";
import { CardContainer } from "../CardContainer";
import { GuessedAmount } from "../GuessedAmount";
import { Link } from "../Link";

interface HistoryCardProps {
  host: string | null;
  game: NonNullable<RouterOutputs["history"]["getGameHistory"]>[number];
  onDelete: () => void;
}

export const HistoryCard = memo(function HistoryCard({
  host,
  game,
  onDelete,
}: HistoryCardProps) {
  const { id, createdAt, amount, answers, animes } = game;
  const resultsPath = `/game/${id}/results`;
  const screenshotUrl = (animes as DBAnimeArray)[0]?.screenshotUrl;
  const correctAnswers = getCorrectAnswersAmount(
    amount,
    answers as DBAnswerArray,
  );

  return (
    <CardContainer>
      <div className="flex flex-col gap-2">
        <Screenshot src={screenshotUrl} />
        <h2 className="card-title">
          <Link style="primary" to={resultsPath}>
            {DateTime.fromJSDate(createdAt)
              .toUTC(createdAt.getTimezoneOffset(), {
                keepLocalTime: true,
              })
              .toFormat("Игра в dd.MM.yyyy в HH:mm")}
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
