import { useCallback, useEffect } from "react";

export function useBeforeUnload(handler: () => void) {
  const onBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      handler();
    },
    [handler],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [onBeforeUnload]);
}
