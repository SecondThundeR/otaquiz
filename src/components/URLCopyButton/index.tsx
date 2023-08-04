import { memo } from "react";

import { Alert } from "@/components/ui/Alert";

import { useLinkCopy } from "@/hooks/useLinkCopy";

import { Button } from "../ui/Button";

interface URLCopyButtonProps {
  host: string | null;
}

export const URLCopyButton = memo(function URLCopyButton({
  host,
}: URLCopyButtonProps) {
  const { onCopyLink, isCopied, error } = useLinkCopy(host);

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={onCopyLink} disabled={isCopied}>
        {isCopied ? "Скопировано!" : "Скопировать ссылку на результат"}
      </Button>
      {error && <Alert type="error">{error.message}</Alert>}
    </div>
  );
});
