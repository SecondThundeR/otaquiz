import { useCallback, useState } from "react";

interface UseAmountOptions {
  min: number;
  max: number;
  step: number;
}

export function useAmount({ min, max, step }: UseAmountOptions) {
  const [amount, setAmount] = useState(() => Math.min(min, max));

  const increment = useCallback(
    () => setAmount((prev) => (prev === max ? prev : prev + step)),
    [max, step],
  );

  const decrement = useCallback(
    () => setAmount((prev) => (prev === min ? prev : prev - step)),
    [min, step],
  );

  return {
    amount,
    increment,
    decrement,
  };
}
