import { http, HttpResponse } from "msw";

import { SHIKIMORI_GRAPHQL_API_URL } from "@/constants/links";

interface QueryParameters {
  query: string;
  variables: object;
}

const decoys = {
  data: {
    animes: [
      {
        id: "1",
        russian: "Аниме 1",
      },
      {
        id: "2",
        russian: "Аниме 2",
      },
      {
        id: "3",
        russian: "Аниме 3",
      },
    ],
  },
};

const screenshots = {
  data: {
    animes: [
      {
        id: "53050",
        screenshots: [
          {
            id: "1",
            originalUrl: "https://example.com/1.jpg",
          },
          {
            id: "2",
            originalUrl: "https://example.com/2.jpg",
          },
          {
            id: "3",
            originalUrl: "https://example.com/3.jpg",
          },
          {
            id: "4",
            originalUrl: "https://example.com/4.jpg",
          },
          {
            id: "5",
            originalUrl: "https://example.com/5.jpg",
          },
          {
            id: "6",
            originalUrl: "https://example.com/6.jpg",
          },
        ],
      },
    ],
  },
};

const animes = {
  data: {
    animes: [
      {
        id: "3363",
        russian: "Реал Драйв",
        screenshots: [
          {
            id: "1",
            originalUrl:
              "https://desu.shikimori.one/system/screenshots/original/935e379767c7689be32ab15bb0862c61a8a896dc.jpg?1596828551",
          },
        ],
        genres: [
          {
            name: "Test",
          },
        ],
      },
      {
        id: "50002",
        russian: "Нулевой Эдем 2",
        screenshots: [
          {
            id: "1",
            originalUrl:
              "https://desu.shikimori.one/system/screenshots/original/04dd03963c44c1bece2baaab8504f80080c915e1.jpg?1680375024",
          },
        ],
        genres: [
          {
            name: "Test",
          },
        ],
      },
      {
        id: "48471",
        russian: "Луна, Лайка и Носферату",
        screenshots: [
          {
            id: "1",
            originalUrl:
              "https://desu.shikimori.one/system/screenshots/original/50258708add70b5a89e5cc08776cc464176c46c3.jpg?1633420294",
          },
        ],
        genres: [
          {
            name: "Test",
          },
        ],
      },
      {
        id: "11597",
        russian: "Истории подделок",
        screenshots: [
          {
            id: "1",
            originalUrl:
              "https://desu.shikimori.one/system/screenshots/original/6eb8d72b30fdb4c67031b69d0683cb536feb1905.jpg?1677995074",
          },
        ],
        genres: [
          {
            name: "Test",
          },
        ],
      },
      {
        id: "36539",
        russian: "Прекрасна, как Луна: Спецвыпуск",
        screenshots: [
          {
            id: "1",
            originalUrl:
              "https://desu.shikimori.one/system/screenshots/original/b077879df5120ec021c5d98def2e288970ee2086.jpg?1580040967",
          },
        ],
        genres: [
          {
            name: "Test",
          },
        ],
      },
    ],
  },
};

export const handlers = [
  http.post(SHIKIMORI_GRAPHQL_API_URL, async ({ request }) => {
    const data = await request.json();
    if (!data)
      return new HttpResponse(null, {
        status: 500,
      });
    const query = (data as QueryParameters).query;
    if (query.includes("DecoyAnimes")) {
      return HttpResponse.json(decoys);
    }
    if (query.includes("AnimeScreenshots")) {
      return HttpResponse.json(screenshots);
    }
    if (query.includes("GameAnimes")) {
      return HttpResponse.json(animes);
    }
    return new HttpResponse(null, {
      status: 500,
    });
  }),
];
