import { memo, useCallback, useEffect, useState } from "react";

import { type DBAnswerAnime } from "@/schemas/db/answers";

import { Button } from "@/ui/Button";
import { ButtonsGrid } from "@/ui/ButtonsGrid";

import { shuffleValues } from "@/utils/array/shuffleValues";
import { compareButtons } from "@/utils/game/compareButtons";

interface QuestionButtonsProps {
  buttons: DBAnswerAnime[];
  isDisabled: boolean;
  correctButtonID: string | false | null;
  onAnswerClick: (anime: DBAnswerAnime) => void;
}

export const QuestionButtons = memo(function QuestionButtons({
  buttons,
  isDisabled,
  correctButtonID,
  onAnswerClick,
}: QuestionButtonsProps) {
  const [selectedButtonID, setSelectedButtonID] = useState<string | null>(null);
  const [currentButtons, setCurrentButtons] =
    useState<DBAnswerAnime[]>(buttons);
  const [shuffledButtons, setShuffledButtons] = useState<DBAnswerAnime[]>(() =>
    shuffleValues(buttons),
  );

  const showSelected = correctButtonID !== false;

  const getButtonStyle = (buttonID: string) => {
    if (!correctButtonID) return "primary";
    if (correctButtonID === buttonID) return "success";
    return "error";
  };

  const onClick = useCallback(
    (anime: DBAnswerAnime) => {
      onAnswerClick(anime);
      setSelectedButtonID(anime.id);
    },
    [onAnswerClick],
  );

  useEffect(() => {
    if (!compareButtons(currentButtons, buttons)) {
      setShuffledButtons(shuffleValues(buttons));
      setCurrentButtons(buttons);
    }
  }, [buttons, currentButtons]);

  return (
    <ButtonsGrid>
      {shuffledButtons.map((anime) => {
        const { id, name } = anime;
        const isButtonSelected = id === selectedButtonID;
        const buttonStyle = getButtonStyle(id);

        return (
          <Button
            key={id}
            style={buttonStyle}
            onClick={() => onClick(anime)}
            disabled={isDisabled}
          >
            {showSelected && isButtonSelected && "Выбрано:"} {name}
          </Button>
        );
      })}
    </ButtonsGrid>
  );
});
