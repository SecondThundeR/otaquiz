import { Screenshot } from "@/components/Screenshot";

import { SHIKIMORI_ANIMES_URL } from "@/constants/links";

import type { DBAnswer } from "@/schemas/db/answers";

import { CardContainer } from "../CardContainer";
import { Link } from "../Link";

const TITLE_VARIANTS = {
  correct: {
    text: "(Правильно)",
    class: "text-success",
  },
  incorrect: {
    text: "(Неправильно)",
    class: "text-error",
  },
} as const;

interface ResultAnswerCardProps {
  answerIndex: number;
  answer: DBAnswer;
  screenshotURL?: string;
}

export const ResultAnswerCard = ({ answerIndex, answer, screenshotURL }: ResultAnswerCardProps) => {
  const isCorrectPicked = !answer.correct;
  const titleResult = isCorrectPicked ? TITLE_VARIANTS.correct : TITLE_VARIANTS.incorrect;

  return (
    <CardContainer>
      <Screenshot src={screenshotURL} />
      <div className="flex flex-col gap-2">
        <h2 className="card-title">
          Раунд {answerIndex}
          <p className={titleResult.class}>{titleResult.text}</p>
        </h2>
        <p>
          Выбрано:{" "}
          <Link
            style="primary"
            href={`${SHIKIMORI_ANIMES_URL}${answer.picked.id}`}
            target="_blank"
            className={isCorrectPicked ? undefined : "line-through"}
          >
            {answer.picked.name}
          </Link>
        </p>
        {answer.correct && (
          <p>
            Ответ:{" "}
            <Link
              style="primary"
              target="_blank"
              href={`${SHIKIMORI_ANIMES_URL}${answer.correct.id}`}
            >
              {answer.correct.name}
            </Link>
          </p>
        )}
      </div>
    </CardContainer>
  );
};
