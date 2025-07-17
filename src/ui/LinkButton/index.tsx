import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import {
  ButtonSizeClasses,
  type ButtonSizeVariants,
  ButtonStyleClasses,
  type ButtonStyleVariants,
} from "../Button";
import { Link, type LinkProps } from "../Link";

type LinkButtonProps = Omit<LinkProps, "role" | "isStyled" | "isHover" | "style"> &
  PropsWithChildren<{
    size?: ButtonSizeVariants;
    style?: ButtonStyleVariants;
    disabled?: boolean;
  }>;

export function LinkButton({
  children,
  size = "md",
  style = "primary",
  disabled = false,
  className,
  ...linkProps
}: LinkButtonProps) {
  return (
    <Link
      isStyled={false}
      isHover={false}
      className={twMerge(
        clsx(
          "btn uppercase",
          ButtonSizeClasses[size],
          ButtonStyleClasses[style],
          disabled && "btn-disabled",
          className,
        ),
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
