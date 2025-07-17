import { useCallback, useState } from "react";

import { ANSWER_TIMEOUT_MS } from "@/constants/time";

import type { DBAnswerAnime } from "@/schemas/db/answers";

import { asyncTimeout } from "@/utils/general/asyncTimeout";

import type { useGameController } from "./useGameController";
import { useScrollTop } from "./useScrollTop";

type UseGameStateOptions = ReturnType<typeof useGameController>["data"] &
  Omit<ReturnType<typeof useGameController>["handlers"], "onGameExit"> & {
    animes: SimpleAnimesData;
    currentAnimeIndex: number;
    amount: number;
    isShowingResult: boolean;
    answerTimeout?: number;
  };

type SimpleAnimesData = {
  id: string;
  name: string;
}[];

export function useGameState({
  animes,
  currentAnimeIndex,
  amount,
  isShowingResult,
  screenshots,
  isDeleting,
  isUpdating,
  answerTimeout = ANSWER_TIMEOUT_MS,
  getButtonAnswers,
  updateAnswers,
}: UseGameStateOptions) {
  const [correctButtonID, setCorrectButtonID] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(currentAnimeIndex);
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false);
  const scrollTop = useScrollTop();

  const maxIndex = animes.length - 1;
  const currentAnime = animes[currentIndex];
  const isFinished = currentIndex === maxIndex;
  const currentAnswerTitle = `${currentIndex + 1} из ${amount}`;
  const currentAnimeScreenshots = screenshots?.find(
    (data) => data.id === currentAnime?.id,
  )?.screenshots;

  const isButtonsDisabled = isUpdating || isDeleting || isUpdatingAnswer;
  const isSavingResult = isUpdating || (isUpdatingAnswer && isFinished);

  const currentButtons = getButtonAnswers(currentAnime, currentIndex);

  const onAnswerClick = useCallback(
    async (anime: DBAnswerAnime) => {
      if (isShowingResult) {
        setCorrectButtonID(currentAnime?.id ?? null);
        await asyncTimeout(answerTimeout);
        setCorrectButtonID(null);
      }
      setIsUpdatingAnswer(true);

      await updateAnswers({
        anime,
        currentAnime,
        isFinished,
      });

      setCurrentIndex(currentIndex + 1);
      setIsUpdatingAnswer(false);
      scrollTop();
    },
    [
      answerTimeout,
      currentAnime,
      currentIndex,
      isFinished,
      isShowingResult,
      scrollTop,
      updateAnswers,
    ],
  );

  return {
    data: {
      correctButtonID,
      currentAnswerTitle,
      currentAnimeScreenshots,
      currentButtons,
      isButtonsDisabled,
      isSavingResult,
    },
    handlers: { onAnswerClick },
  };
}
