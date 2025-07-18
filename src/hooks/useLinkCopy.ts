import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/router";

export function useLinkCopy(host: string | null, path?: string) {
  const { asPath } = useRouter();
  const { copied: isCopied, copy, error } = useClipboard({ timeout: 1500 });

  const onCopyLink = () => {
    copy(host + (path ?? asPath));
  };

  return { onCopyLink, isCopied, error };
}
