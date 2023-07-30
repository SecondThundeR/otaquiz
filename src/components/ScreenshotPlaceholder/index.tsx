import cn from "classnames";
import { memo } from "react";

import { SCREENSHOT_CLASSES } from "@/constants/screenshotClasses";

import { Spinner } from "../Spinner";

interface ScreenshotPlaceholderProps {
  isLoading: boolean;
}

export const ScreenshotPlaceholder = memo(function ScreenshotPlaceholder({
  isLoading,
}: ScreenshotPlaceholderProps) {
  return (
    <div
      className={cn(
        SCREENSHOT_CLASSES,
        "flex items-center justify-center bg-base-300",
        {
          hidden: !isLoading,
        },
      )}
    >
      <Spinner size="large" />
    </div>
  );
});
