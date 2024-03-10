import { memo, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";

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
  const isPointerDisabled = showSelected && correctButtonID !== null;

  const getButtonStyle = useCallback(
    (buttonID: string) => {
      if (!correctButtonID) return "primary";
      if (correctButtonID === buttonID) return "success";
      return "error";
    },
    [correctButtonID],
  );

  const onClick = useCallback(
    (anime: DBAnswerAnime) => {
      onAnswerClick(anime);
      setSelectedButtonID(anime.id);
    },
    [onAnswerClick],
  );

  useEffect(() => {
    if (compareButtons(currentButtons, buttons)) return;

    setShuffledButtons(shuffleValues(buttons));
    setCurrentButtons(buttons);
  }, [buttons, currentButtons]);

  const buttonsContent = useMemo(
    () =>
      shuffledButtons.map((anime) => {
        const { id, name } = anime;
        const isButtonSelected = id === selectedButtonID;
        const isSuffixAdded = showSelected && isButtonSelected;
        const buttonStyle = getButtonStyle(id);
        const onClickHandler = () => onClick(anime);

        return (
          <Button
            key={id}
            style={buttonStyle}
            onClick={onClickHandler}
            className={clsx({
              "pointer-events-none": isPointerDisabled,
            })}
            disabled={isDisabled}
          >
            {isSuffixAdded && "Выбрано: "}
            {name}
          </Button>
        );
      }),
    [
      getButtonStyle,
      isDisabled,
      isPointerDisabled,
      onClick,
      selectedButtonID,
      showSelected,
      shuffledButtons,
    ],
  );

  return <ButtonsGrid>{buttonsContent}</ButtonsGrid>;
});
