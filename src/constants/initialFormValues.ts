export const initialFormValues = {
  limit: 1,
  score: "",
  censored: false,
  isShowingResult: false,
  kind: {
    tv: {
      label: "TV Сериал",
      checked: false,
      excluded: false,
    },
    tv_13: {
      label: "TV Сериал (Короткие)",
      checked: false,
      excluded: false,
    },
    tv_24: {
      label: "TV Сериал (Средние)",
      checked: false,
      excluded: false,
    },
    tv_48: {
      label: "TV Сериал (Длинные)",
      checked: false,
      excluded: false,
    },
    movie: {
      label: "Фильм",
      checked: false,
      excluded: false,
    },
    ova: {
      label: "ONA",
      checked: false,
      excluded: false,
    },
    ona: {
      label: "OVA",
      checked: false,
      excluded: false,
    },
    special: {
      label: "Спешл",
      checked: false,
      excluded: false,
    },
    music: {
      label: "Клип",
      checked: false,
      excluded: false,
    },
  },
  status: {
    anons: {
      label: "Анонсировано",
      checked: false,
      excluded: false,
    },
    ongoing: {
      label: "Сейчас выходит",
      checked: false,
      excluded: false,
    },
    released: {
      label: "Вышедшее",
      checked: false,
      excluded: false,
    },
  },
  season: {
    "2023": {
      label: "2023 год",
      checked: false,
      excluded: false,
    },
    "2022": {
      label: "2022 год",
      checked: false,
      excluded: false,
    },
    "2020_2021": {
      label: "2020-2021",
      checked: false,
      excluded: false,
    },
    "2015_2019": {
      label: "2015-2019",
      checked: false,
      excluded: false,
    },
    "2010_2014": {
      label: "2010-2014",
      checked: false,
      excluded: false,
    },
    "2000_2010": {
      label: "2000-2010",
      checked: false,
      excluded: false,
    },
    "199x": {
      label: "1990е годы",
      checked: false,
      excluded: false,
    },
    "198x": {
      label: "1980е годы",
      checked: false,
      excluded: false,
    },
    ancient: {
      label: "Более старые",
      checked: false,
      excluded: false,
    },
  },
  duration: {
    S: {
      label: "До 10 минут",
      checked: false,
      excluded: false,
    },
    D: {
      label: "До 30 минут",
      checked: false,
      excluded: false,
    },
    F: {
      label: "Более 30 минут",
      checked: false,
      excluded: false,
    },
  },
  rating: {
    none: {
      label: "Без рейтинга",
      checked: false,
      excluded: false,
    },
    g: {
      label: "G",
      checked: false,
      excluded: false,
    },
    pg: {
      label: "PG",
      checked: false,
      excluded: false,
    },
    pg_13: {
      label: "PG-13",
      checked: false,
      excluded: false,
    },
    r: {
      label: "R",
      checked: false,
      excluded: false,
    },
    r_plus: {
      label: "R+",
      checked: false,
      excluded: false,
    },
    rx: {
      label: "Rx",
      checked: false,
      excluded: false,
    },
  },
};
