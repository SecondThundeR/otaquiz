import { api } from "@/utils/trpc/api";

export function useAnimeData(animeIds: string) {
  const { data: screenshots, isLoading: isLoadingScreenshots } =
    api.anime.getAnimeScreenshots.useQuery(
      { animeIds },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    );
  const { data: decoys, isLoading: isLoadingDecoys } =
    api.anime.getAnswerDecoys.useQuery(
      { animeIds },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    );

  const isLoading = isLoadingScreenshots || isLoadingDecoys;

  return {
    data: { screenshots, decoys, isLoading },
  };
}
