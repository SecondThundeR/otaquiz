import type { DBAnswerArray } from "@/schemas/db/answers";

export function getCorrectAnswersAmount(amount: number, answers: DBAnswerArray) {
  return (
    amount -
    answers.reduce((acc, prev) => {
      acc += Number(!!prev.correct);
      return acc;
    }, 0)
  );
}
