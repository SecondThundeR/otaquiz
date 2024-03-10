import { memo, useMemo } from "react";

import { type DBAnimeArray } from "@/schemas/db/animes";
import { type DBAnswerArray } from "@/schemas/db/answers";

import { CardsGrid } from "@/ui/CardsGrid";
import { ResultAnswerCard } from "@/ui/ResultAnswerCard";

interface ResultAnswersProps {
  answers: DBAnswerArray;
  animes: DBAnimeArray;
}

export const ResultAnswers = memo(function ResultAnswers({
  answers,
  animes,
}: ResultAnswersProps) {
  const answersContent = useMemo(
    () =>
      answers?.map((answer, i) => {
        const correctAnimeID = answer.correct?.id ?? answer.picked.id;
        const currentScreenshotURL = animes.find(
          (anime) => anime.id === correctAnimeID,
        )?.screenshotUrl;

        return (
          <ResultAnswerCard
            key={i}
            answer={answer}
            answerIndex={i + 1}
            screenshotURL={currentScreenshotURL}
          />
        );
      }),
    [animes, answers],
  );

  return <CardsGrid>{answersContent}</CardsGrid>;
});
