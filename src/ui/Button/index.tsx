import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonSizeVariants =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "wide"
  | "square"
  | "block"
  | "circle";

export type ButtonStyleVariants =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "link"
  | "outline"
  | "active"
  | "disabled"
  | "glass"
  | "noAnimation";

export const ButtonSizeClasses: Record<ButtonSizeVariants, string> = {
  xs: "btn-xs",
  md: "btn-md",
  sm: "btn-sm",
  lg: "btn-lg",
  xl: "btn-xl",
  wide: "btn-wide",
  square: "btn-square",
  block: "btn-block",
  circle: "btn-circle",
};

export const ButtonStyleClasses: Record<ButtonStyleVariants, string> = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  ghost: "btn-ghost",
  link: "btn-link",
  outline: "btn-outline",
  active: "btn-active",
  disabled: "btn-disabled",
  glass: "glass",
  noAnimation: "no-animation",
};

type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "onClick" | "className" | "aria-label" | "type"
> &
  PropsWithChildren<{
    size?: ButtonSizeVariants | null;
    style?: ButtonStyleVariants | null;
  }>;

export function Button({
  children,
  size = "md",
  style = "primary",
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "btn h-full py-2 uppercase transition-colors duration-300",
          size && ButtonSizeClasses[size],
          style && ButtonStyleClasses[style],
          className,
        ),
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
