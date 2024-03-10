export const gameQuery = `
  query GameAnimes($limit: Int, $kind: AnimeKindString, $status: AnimeStatusString, $season: SeasonString, $score: Int, $duration: DurationString, $rating: RatingString, $censored: Boolean, $excludeIds: String) {
    animes(
      limit: $limit
      order: random
      kind: $kind
      status: $status
      season: $season
      score: $score
      duration: $duration
      rating: $rating
      censored: $censored
      excludeIds: $excludeIds
    ) {
      id
      russian
      screenshots {
          id
          originalUrl
      }
      genres {
          name
      }
    }
  }
`;

export const screenshotsQuery = `
  query AnimeScreenshots($ids: String) {
    animes(ids: $ids, limit: 50) {
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
    animes(order: random, limit: 50, excludeIds: $excludeIds) {
      id
      russian
    }
  }
`;
