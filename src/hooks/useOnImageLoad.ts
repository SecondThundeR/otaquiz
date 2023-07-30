import { useState } from "react";

export function useOnImageLoad(): [boolean, () => void] {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => setIsLoading(false);

  return [isLoading, onLoad];
}
