import clsx from "clsx";
import { memo } from "react";

type SpinnerSizeVariants = "extraSmall" | "small" | "medium" | "large";

const SpinnerSizeClasses: Record<SpinnerSizeVariants, string> = {
  extraSmall: "loading-xs",
  small: "loading-sm",
  medium: "loading-md",
  large: "loading-lg",
};

interface SpinnerProps {
  size?: SpinnerSizeVariants;
}

export const Spinner = memo(function Spinner({
  size = "medium",
}: SpinnerProps) {
  return (
    <span
      className={clsx("loading loading-spinner", SpinnerSizeClasses[size])}
    ></span>
  );
});
