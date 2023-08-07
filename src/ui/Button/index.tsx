import { memo, type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import clsx from "clsx";

type ButtonSizeVariants =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "wide"
  | "square"
  | "block"
  | "circle";

type ButtonStyleVariants =
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

const ButtonSizeClasses: Record<ButtonSizeVariants, string> = {
  xs: "btn-xs",
  md: "btn-md",
  sm: "btn-sm",
  lg: "btn-lg",
  wide: "btn-wide",
  square: "btn-square",
  block: "btn-block",
  circle: "btn-circle",
};

const ButtonStyleClasses: Record<ButtonStyleVariants, string> = {
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
  "disabled" | "onClick" | "className" | "aria-label"
> &
  PropsWithChildren<{
    size?: ButtonSizeVariants;
    style?: ButtonStyleVariants;
  }>;

export const Button = memo(function Button({
  children,
  size = "md",
  style = "primary",
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "btn",
        ButtonSizeClasses[size],
        ButtonStyleClasses[style],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
});
