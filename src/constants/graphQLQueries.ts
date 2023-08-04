export const gameQuery = `
  query GameAnimes($excludeIds: String) {
    animes(order: random, limit: 50, excludeIds: $excludeIds, score: 6) {
      id
      russian
      screenshots {
        id
        originalUrl
      }
    }
  }
`;

export const screenshotsQuery = `
  query AnimeScreenshots($ids: String) {
    animes(ids: $ids, limit: 50, score: 6) {
      id
      screenshots {
        id
        originalUrl
      }
    }
  }
`;

export const decoyQuery = `
  query DecoyAnimes($excludeIds: String) {
    animes(order: random, limit: 50, excludeIds: $excludeIds, score: 6) {
      id
      russian
    }
  }
`;
