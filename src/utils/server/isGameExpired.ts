import { TEN_MINUTES } from "@/constants/time";

export function isGameExpired(updatedAt: Date) {
  return Date.now() - updatedAt.getTime() >= TEN_MINUTES;
}
