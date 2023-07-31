export const buildScreenshotsParams = (animeIds: string) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        animes(ids: "${animeIds}", limit: 50) {
          id
          screenshots {
            id
            originalUrl
          }
        }
      }`,
    }),
  };
};
