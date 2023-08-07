import { useCallback } from "react";
import { useRouter } from "next/router";
import { useClipboard } from "@mantine/hooks";

export function useLinkCopy(host: string | null, path?: string) {
  const { asPath } = useRouter();
  const { copied: isCopied, copy, error } = useClipboard({ timeout: 1500 });

  const onCopyLink = useCallback(() => {
    copy(host + (path ?? asPath));
  }, [asPath, copy, host, path]);

  return { onCopyLink, isCopied, error };
}
