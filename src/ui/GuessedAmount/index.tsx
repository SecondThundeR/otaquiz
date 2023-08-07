import clsx from "clsx";
import { memo } from "react";

interface GuessedAmountProps {
  correct: number;
  amount: number;
}

export const GuessedAmount = memo(function GuessedAmount({
  correct,
  amount,
}: GuessedAmountProps) {
  return (
    <span
      className={clsx({
        "text-success": correct === amount,
        "text-error": correct === 0,
        "text-info": correct > 0 && correct < amount,
      })}
    >
      {correct} из {amount}
    </span>
  );
});
