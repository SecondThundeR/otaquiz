import type { PropsWithChildren } from "react";

import { useLinkCopy } from "@/hooks/useLinkCopy";

import { Alert } from "@/ui/Alert";
import { Button } from "@/ui/Button";

type URLCopyButtonProps = PropsWithChildren<{
  host: string | null;
  path?: string;
}>;

export const URLCopyButton = function URLCopyButton({ host, path, children }: URLCopyButtonProps) {
  const { onCopyLink, isCopied, error } = useLinkCopy(host, path);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onCopyLink} disabled={isCopied}>
        {isCopied ? "Скопировано!" : children}
      </Button>
      {error && <Alert type="error">{error.message}</Alert>}
    </div>
  );
};
