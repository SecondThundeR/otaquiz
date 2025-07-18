import { useConfirmDelete } from "@/hooks/useConfirmDelete";

import { Button } from "@/ui/Button";

const BUTTON_CLICKS_TEXT: Record<number, string> = {
  0: "Удалить",
  1: "Нажмите еще раз",
};

interface DeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  const { buttonClicks, onClick } = useConfirmDelete(onDelete);

  return (
    <Button style="error" onClick={onClick}>
      {BUTTON_CLICKS_TEXT[buttonClicks]}
    </Button>
  );
};
