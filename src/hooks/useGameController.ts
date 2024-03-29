import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { type DBAnswerAnime, type DBAnswerArray } from "@/schemas/db/answers";

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
  currentAnime: DBAnswerAnime;
  isFinished: boolean;
}

export function useGameController({
  gameId,
  animeIds,
  currentAnswers,
}: UseGameControllerProps) {
  const router = useRouter();
  const {
    data: { screenshots, decoys },
  } = useAnimeData(animeIds);
  const [answers, setAnswers] = useState(currentAnswers);
  const [isUpdatedBeforeUnload, setIsUpdatedBeforeUnload] = useState(false);

  const { mutateAsync: updateAsync, isPending: isUpdating } =
    api.game.updateGameAnswers.useMutation();
  const { mutateAsync: deleteAsync, isPending: isDeleting } =
    api.game.deleteGame.useMutation();

  const onBeforeUnload = useCallback(async () => {
    if (isUpdatedBeforeUnload || answers.length === 0) return;

    setIsUpdatedBeforeUnload(true);
    const isFinished = answers.length === animeIds.split(",").length;

    await updateAsync({
      gameId,
      answers,
      isFinished,
    });
  }, [animeIds, answers, gameId, isUpdatedBeforeUnload, updateAsync]);

  useBeforeUnload(onBeforeUnload);

  const onGameExit = useCallback(async () => {
    await deleteAsync({ gameId });
  }, [deleteAsync, gameId]);

  const getButtonAnswers = useCallback(
    (anime: DBAnswerAnime, currentIndex: number) => {
      return [
        anime,
        ...(decoys?.slice(currentIndex * 3, (currentIndex + 1) * 3) ?? []),
      ];
    },
    [decoys],
  );

  const updateAnswers = useCallback(
    async (options: OnAnswerClickOptions) => {
      setIsUpdatedBeforeUnload(false);
      const { anime, currentAnime, isFinished } = options;
      const newAnswers = [
        ...answers,
        {
          correct: anime.id !== currentAnime.id ? currentAnime : null,
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
    },
    [answers, updateAsync, gameId, router],
  );

  return {
    data: { screenshots, isDeleting, isUpdating },
    handlers: {
      onGameExit,
      getButtonAnswers,
      updateAnswers,
    },
  };
}
