import cn from "classnames";
import { memo } from "react";

import { Spinner } from "../Spinner";

interface ScreenshotPlaceholderProps {
  className: string;
  isLoading: boolean;
  fullWidth?: boolean;
}

export const ScreenshotPlaceholder = memo(function ScreenshotPlaceholder({
  className,
  isLoading,
  fullWidth = false,
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={cn(className, "flex items-center justify-center bg-base-300", {
        hidden: !isLoading,
        "sm:w-[512px]": fullWidth,
      })}
    >
      <Spinner size="large" />
    </div>
  );
});
