import { useRouter } from "next/router";
import { useState } from "react";

import type { DBAnswerAnime, DBAnswerArray } from "@/schemas/db/answers";

import { api } from "@/utils/trpc/api";

import { useAnimeData } from "./useAnimeData";
import { useBeforeUnload } from "./useBeforeUnload";

interface UseGameControllerProps {
  gameId: string;
  animeIds: string;
  currentAnswers: DBAnswerArray;
}

interface OnAnswerClickOptions {
  anime: DBAnswerAnime;
  currentAnime: DBAnswerAnime | undefined;
  isFinished: boolean;
}

export function useGameController({ gameId, animeIds, currentAnswers }: UseGameControllerProps) {
  const router = useRouter();
  const {
    data: { screenshots, decoys },
  } = useAnimeData(animeIds);
  const [answers, setAnswers] = useState(currentAnswers);
  const [isUpdatedBeforeUnload, setIsUpdatedBeforeUnload] = useState(false);

  const { mutateAsync: updateAsync, isPending: isUpdating } =
    api.game.updateGameAnswers.useMutation();
  const { mutateAsync: deleteAsync, isPending: isDeleting } = api.game.deleteGame.useMutation();

  const onBeforeUnload = async () => {
    if (isUpdatedBeforeUnload || answers.length === 0) return;

    setIsUpdatedBeforeUnload(true);
    const isFinished = answers.length === animeIds.split(",").length;

    await updateAsync({
      gameId,
      answers,
      isFinished,
    });
  };

  useBeforeUnload(onBeforeUnload);

  const onGameExit = async () => {
    await deleteAsync({ gameId });
  };

  const getButtonAnswers = (anime: DBAnswerAnime | undefined, currentIndex: number) => {
    if (!anime) {
      throw new Error("Passed anime is undefined, can't get button answers for this");
    }

    return [anime, ...(decoys?.slice(currentIndex * 3, (currentIndex + 1) * 3) ?? [])];
  };

  const updateAnswers = async (options: OnAnswerClickOptions) => {
    setIsUpdatedBeforeUnload(false);
    const { anime, currentAnime, isFinished } = options;
    const newAnswers = [
      ...answers,
      {
        correct: anime.id !== currentAnime?.id ? (currentAnime ?? null) : null,
        picked: anime,
      },
    ];

    if (isFinished) {
      await updateAsync({
        gameId,
        answers: newAnswers,
        isFinished,
      });
      return await router.push(`${router.asPath}/results`);
    }

    setAnswers(newAnswers);
  };

  return {
    data: { screenshots, isDeleting, isUpdating },
    handlers: {
      onGameExit,
      getButtonAnswers,
      updateAnswers,
    },
  };
}
