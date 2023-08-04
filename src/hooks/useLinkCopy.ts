import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useCallback } from "react";

export function useLinkCopy(host: string | null) {
  const { asPath } = useRouter();
  const { copied: isCopied, copy, error } = useClipboard({ timeout: 1500 });

  const onCopyLink = useCallback(() => {
    copy(host + asPath);
  }, [asPath, copy, host]);

  return { onCopyLink, isCopied, error };
}
