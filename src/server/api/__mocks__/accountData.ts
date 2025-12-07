import { createGameDataMock } from "./gameData";

export const accountDataMock = {
  id: "a12b5f7b-6d63-4d84-a83d-6fb2439f7e6c",
  userId: createGameDataMock.userId,
  type: "oauth",
  provider: "shikimori",
  providerAccountId: "123123",
  refresh_token: "refresh_token",
  access_token: "access_token",
  expires_at: 1,
  created_at: 1,
  token_type: "Bearer",
  scope: "user_rates comments topics",
  id_token: null,
  session_state: null,
} as const;
