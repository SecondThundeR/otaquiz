import clsx from "clsx";

interface GuessedAmountProps {
  correct: number;
  amount: number;
}

export const GuessedAmount = ({ correct, amount }: GuessedAmountProps) => {
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
};
