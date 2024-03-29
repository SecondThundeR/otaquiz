import { memo } from "react";

import { useConfirmDelete } from "@/hooks/useConfirmDelete";

import { Button } from "@/ui/Button";

const buttonClicksText: Record<number, string> = {
  0: "Удалить",
  1: "Нажмите еще раз, чтобы удалить",
};

interface DeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton = memo(function DeleteButton({
  onDelete,
}: DeleteButtonProps) {
  const { buttonClicks, onClick } = useConfirmDelete(onDelete);

  return (
    <Button style="error" onClick={onClick}>
      {buttonClicksText[buttonClicks]}
    </Button>
  );
});
