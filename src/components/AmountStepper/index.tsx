import { HorizontalRuleIcon, PlusIcon } from "@primer/octicons-react";
import { memo } from "react";

import { type useAmount } from "@/hooks/useAmount";

import { Button } from "@/ui/Button";

export const AmountStepper = memo(function AmountStepper({
  amount,
  increment,
  decrement,
}: ReturnType<typeof useAmount>) {
  return (
    <div className="flex items-center gap-4">
      <Button
        size="square"
        style="outline"
        className="border-2"
        onClick={decrement}
        aria-label="Уменьшить количество аниме"
      >
        <HorizontalRuleIcon className="h-5 w-5 stroke-2" />
      </Button>
      <h1 className="text-5xl">{amount}</h1>
      <Button
        size="square"
        style="outline"
        className="border-2"
        onClick={increment}
        aria-label="Увеличить количество аниме"
      >
        <PlusIcon className="h-6 w-6 stroke-2" />
      </Button>
    </div>
  );
});
