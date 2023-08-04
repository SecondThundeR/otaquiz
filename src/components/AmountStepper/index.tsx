import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { memo } from "react";

import { type useAmount } from "@/hooks/useAmount";

import { Button } from "../ui/Button";

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
        onClick={increment}
      >
        <PlusIcon className="h-7 w-7 stroke-2" />
      </Button>
      <h1 className="text-5xl">{amount}</h1>
      <Button
        size="square"
        style="outline"
        className="border-2"
        onClick={decrement}
      >
        <MinusIcon className="h-7 w-7 stroke-2" />
      </Button>
    </div>
  );
});
