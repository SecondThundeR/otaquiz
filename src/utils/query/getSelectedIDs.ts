import { type Animes } from "@/schemas/animes";

export function getSelectedIDs(animes: Animes) {
  if (animes.length === 0) return null;
  return `${animes.map((anime) => anime.id).join(",")}`;
}
