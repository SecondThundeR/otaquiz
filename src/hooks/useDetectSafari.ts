import { useEffect, useState } from "react";

export function useDetectSafari() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof navigator !== undefined)
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return isSafari;
}
