import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { Spinner } from "../Spinner";

interface ScreenshotPlaceholderProps {
  className: string;
  isLoading: boolean;
  fullWidth?: boolean;
}

export const ScreenshotPlaceholder = ({
  className,
  isLoading,
  fullWidth = false,
}: ScreenshotPlaceholderProps) => {
  return (
    <div
      className={twMerge(
        clsx(className, "flex items-center justify-center bg-base-300", {
          hidden: !isLoading,
          "sm:w-full": fullWidth,
        }),
      )}
    >
      <Spinner size="large" />
    </div>
  );
};
