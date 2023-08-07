import { useCallback, useEffect } from "react";

export function useBeforeUnload(handler: () => Promise<void>) {
  const onBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
      handler().catch(console.error);
    },
    [handler],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [onBeforeUnload]);
}
