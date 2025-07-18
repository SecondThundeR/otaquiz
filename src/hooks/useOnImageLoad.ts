import { useState } from "react";

export function useOnImageLoad() {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => setIsLoading(false);

  return [isLoading, onLoad] as const;
}
