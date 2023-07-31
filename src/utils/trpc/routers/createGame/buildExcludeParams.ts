export const buildExcludeParams = (excludeIds: string | null) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        animes(order: random, limit: 50, excludeIds: ${excludeIds}) {
          id
          russian
          screenshots {
            id
            originalUrl
          }
        }
      }`,
    }),
  };
};
