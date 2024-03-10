import { useCallback, useEffect, useState } from "react";

type ConfirmDeleteHandler = () => void;

const CLICKS_THRESHOLD = 2;
const CLICKS_TIMEOUT_SECONDS = 2.5;

export function useConfirmDelete(handler: ConfirmDeleteHandler) {
  const [buttonClicks, setButtonClicks] = useState(0);

  const isThresholdPassed = CLICKS_THRESHOLD - buttonClicks === 0;

  const onClick = useCallback(() => setButtonClicks((prev) => prev + 1), []);

  useEffect(() => {
    if (buttonClicks === 0) return;

    if (isThresholdPassed) {
      handler();
      return;
    }

    const resetTimer = setTimeout(
      () => setButtonClicks(0),
      CLICKS_TIMEOUT_SECONDS * 1000,
    );

    return () => clearTimeout(resetTimer);
  }, [buttonClicks, handler, isThresholdPassed]);

  return { buttonClicks, onClick };
}
