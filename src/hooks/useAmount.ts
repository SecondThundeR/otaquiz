import { useState } from "react";

interface UseAmountOptions {
  min: number;
  max: number;
  step: number;
}

export default function useAmount({ min, max, step }: UseAmountOptions) {
  const [amount, setAmount] = useState(Math.min(min, max));

  const increment = () =>
    setAmount((prev) => (prev === max ? prev : prev + step));

  const decrement = () =>
    setAmount((prev) => (prev === min ? prev : prev - step));

  return {
    amount,
    increment,
    decrement,
  };
}
