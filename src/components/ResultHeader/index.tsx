import { type Session } from "next-auth";
import { memo } from "react";

import { GuessedAmount } from "@/ui/GuessedAmount";
import { Subtitle } from "@/ui/Subtitle";

import { UsernameLink } from "../UsernameLink";

type ResultHeaderProps = Pick<Session["user"], "name"> & {
  correctAnswers: number;
  amount: number;
};

export const ResultHeader = memo(function ResultHeader({
  name,
  correctAnswers,
  amount,
}: ResultHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Subtitle>
        <UsernameLink name={name} /> ответил(а) правильно на{" "}
        <GuessedAmount correct={correctAnswers} amount={amount} /> вопросов
      </Subtitle>
    </div>
  );
});
