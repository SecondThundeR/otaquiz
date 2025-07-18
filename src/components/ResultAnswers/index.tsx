import type { DBAnimeArray } from "@/schemas/db/animes";
import type { DBAnswerArray } from "@/schemas/db/answers";

import { CardsGrid } from "@/ui/CardsGrid";
import { ResultAnswerCard } from "@/ui/ResultAnswerCard";

interface ResultAnswersProps {
  answers: DBAnswerArray;
  animes: DBAnimeArray;
}

export const ResultAnswers = ({ answers, animes }: ResultAnswersProps) => {
  const answersContent = answers?.map((answer, i) => {
    const correctAnimeID = answer.correct?.id ?? answer.picked.id;
    const currentScreenshotURL = animes.find((anime) => anime.id === correctAnimeID)?.screenshotUrl;

    return (
      <ResultAnswerCard
        // biome-ignore lint/suspicious/noArrayIndexKey: This will be fixed later when answer will return identifier.
        key={i}
        answer={answer}
        answerIndex={i + 1}
        screenshotURL={currentScreenshotURL}
      />
    );
  });

  return <CardsGrid>{answersContent}</CardsGrid>;
};
