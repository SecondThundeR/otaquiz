import { memo, useEffect, useState } from "react";

import { type DBAnswerAnime } from "@/schemas/db/answers";

import { Button } from "@/ui/Button";
import { ButtonsGrid } from "@/ui/ButtonsGrid";

import { shuffleValues } from "@/utils/array/shuffleValues";

interface QuestionButtonsProps {
  buttons: DBAnswerAnime[];
  isDisabled: boolean;
  onAnswerClick: (anime: DBAnswerAnime) => void;
}

export const QuestionButtons = memo(function QuestionButtons({
  buttons,
  isDisabled,
  onAnswerClick,
}: QuestionButtonsProps) {
  const [shuffledButtons, setShuffledButtons] = useState(buttons);

  useEffect(() => {
    if (isDisabled || buttons.length < 4) return;
    setShuffledButtons(shuffleValues(buttons));
  }, [buttons, isDisabled]);

  return (
    <ButtonsGrid>
      {shuffledButtons.map((anime) => {
        const { id, name } = anime;

        return (
          <Button
            key={id}
            onClick={() => onAnswerClick(anime)}
            disabled={isDisabled}
          >
            {name}
          </Button>
        );
      })}
    </ButtonsGrid>
  );
});
