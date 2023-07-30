import cn from "classnames";
import { memo } from "react";

type SpinnerSizeVariants =
  | "extraSmall"
  | "small"
  | "regular"
  | "medium"
  | "large";

const SpinnerSizeClasses: Record<SpinnerSizeVariants, string> = {
  extraSmall: "loading-xs",
  small: "loading-sm",
  regular: "loading",
  medium: "loading-md",
  large: "loading-lg",
};

interface SpinnerProps {
  size?: SpinnerSizeVariants;
}

export const Spinner = memo(function Spinner({
  size = "regular",
}: SpinnerProps) {
  return (
    <span className={cn("loading-spinner", SpinnerSizeClasses[size])}></span>
  );
});
