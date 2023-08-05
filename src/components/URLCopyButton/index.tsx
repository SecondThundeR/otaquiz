import { type PropsWithChildren, memo } from "react";

import { Alert } from "@/components/ui/Alert";

import { useLinkCopy } from "@/hooks/useLinkCopy";

import { Button } from "../ui/Button";

type URLCopyButtonProps = PropsWithChildren<{
  host: string | null;
  path?: string;
}>;

export const URLCopyButton = memo(function URLCopyButton({
  host,
  path,
  children,
}: URLCopyButtonProps) {
  const { onCopyLink, isCopied, error } = useLinkCopy(host, path);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onCopyLink} disabled={isCopied}>
        {isCopied ? "Скопировано!" : children}
      </Button>
      {error && <Alert type="error">{error.message}</Alert>}
    </div>
  );
});
