import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface AmountStepperProps {
  amount: number;
  increment: () => void;
  decrement: () => void;
}

export default function AmountStepper({
  amount,
  increment,
  decrement,
}: AmountStepperProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button className="btn btn-square btn-outline" onClick={increment}>
        <PlusIcon className="h-6 w-6" />
      </button>
      <h1 className="font-accent text-4xl">{amount}</h1>
      <button className="btn btn-square btn-outline" onClick={decrement}>
        <MinusIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
