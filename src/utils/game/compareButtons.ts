import { type DBAnswerAnime } from "@/schemas/db/answers";

export function compareButtons(
  oldButtons: Readonly<DBAnswerAnime[]>,
  newButtons: Readonly<DBAnswerAnime[]>,
) {
  return (
    oldButtons.length === newButtons.length &&
    oldButtons.every((oldButton, index) => {
      const newButton = newButtons[index];
      return (
        oldButton.id === newButton?.id && oldButton.name === newButton?.name
      );
    })
  );
}
