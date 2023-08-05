import { useEffect, useState } from "react";

const CLICKS_THRESHOLD = 2;
const CLICKS_TIMEOUT_SECONDS = 2.5;

export function useConfirmDelete(handler: () => void) {
  const [buttonClicks, setButtonClicks] = useState(0);

  const isThresholdPassed = CLICKS_THRESHOLD - buttonClicks === 0;

  useEffect(() => {
    if (buttonClicks === 0) return;

    if (isThresholdPassed) {
      handler();
      return;
    }

    const resetTimer = setTimeout(
      () => resetButtonClicks(),
      CLICKS_TIMEOUT_SECONDS * 1000,
    );
    return () => clearTimeout(resetTimer);
  }, [buttonClicks, handler, isThresholdPassed]);

  const resetButtonClicks = () => setButtonClicks(0);

  const onClick = () => setButtonClicks((prev) => prev + 1);

  return { buttonClicks, onClick };
}
