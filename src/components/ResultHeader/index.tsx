import clsx from "clsx";
import { type Session } from "next-auth";
import { memo } from "react";

import { Subtitle } from "@/components/ui/Subtitle";

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
        <span
          className={clsx({
            "text-success": correctAnswers === amount,
            "text-error": correctAnswers === 0,
            "text-info": correctAnswers > 0 && correctAnswers < amount,
          })}
        >
          {correctAnswers} из {amount}
        </span>{" "}
        вопросов
      </Subtitle>
    </div>
  );
});
