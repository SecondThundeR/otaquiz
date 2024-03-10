import { type DBAnswerAnime } from "@/schemas/db/answers";

export function compareButtons(
  oldButtons: Readonly<DBAnswerAnime[]>,
  newButtons: Readonly<DBAnswerAnime[]>,
) {
  return (
    oldButtons.length === newButtons.length &&
    oldButtons.every(({ id, name }, index) => {
      const newButton = newButtons[index];
      return id === newButton?.id && name === newButton?.name;
    })
  );
}
