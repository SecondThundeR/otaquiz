import { useCallback, useEffect } from "react";

type BeforeUnloadHandler = () => Promise<void>;

export function useBeforeUnload(handler: BeforeUnloadHandler) {
  const onBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      event.preventDefault();
      handler().catch(console.error);
    },
    [handler],
  );

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [onBeforeUnload]);
}
