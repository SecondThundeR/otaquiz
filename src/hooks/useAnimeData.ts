import { api } from "@/utils/trpc/api";

export function useAnimeData(animeIds: string) {
  const { data: screenshots } = api.anime.getAnimeScreenshots.useQuery(
    { animeIds },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );
  const { data: decoys } = api.anime.getAnswerDecoys.useQuery(
    { animeIds },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );

  return {
    data: { screenshots, decoys },
  };
}
