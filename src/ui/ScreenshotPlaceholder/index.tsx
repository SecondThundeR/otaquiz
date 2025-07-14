import { memo } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

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
      className={twMerge(
        clsx(className, "bg-base-300 flex items-center justify-center", {
          hidden: !isLoading,
          "sm:w-full": fullWidth,
        }),
      )}
    >
      <Spinner size="large" />
    </div>
  );
});
