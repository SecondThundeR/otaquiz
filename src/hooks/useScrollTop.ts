import { useCallback } from "react";

export function useScrollTop() {
  const scrollTop = useCallback(() => {
    if (!(typeof window !== "undefined")) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return scrollTop;
}
