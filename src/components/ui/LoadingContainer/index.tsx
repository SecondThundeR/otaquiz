import { type PropsWithChildren, memo } from "react";

import { Spinner } from "../Spinner";
import { Subtitle } from "../Subtitle";

export const LoadingContainer = memo(function LoadingContainer({
  children,
}: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center gap-4">
      <Spinner size="large" />
      <Subtitle>{children}</Subtitle>
    </div>
  );
});
