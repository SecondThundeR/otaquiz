import { useCallback, useState } from "react";

export function useOnImageLoad() {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = useCallback(() => setIsLoading(false), []);

  return [isLoading, onLoad] as const;
}
