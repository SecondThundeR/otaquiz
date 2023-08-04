import clsx from "clsx";
import { type AnchorHTMLAttributes, type PropsWithChildren, memo } from "react";

type LinkStyleVariants =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "info"
  | "warning"
  | "error";

const LinkStyleClasses: Record<LinkStyleVariants, string> = {
  neutral: "link-neutral",
  primary: "link-primary",
  secondary: "link-secondary",
  accent: "link-accent",
  success: "link-success",
  info: "link-info",
  warning: "link-warning",
  error: "link-error",
};

type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "role" | "target" | "onClick" | "className"
> &
  PropsWithChildren<{
    isStyled?: boolean;
    isHover?: boolean;
    style?: LinkStyleVariants;
  }>;

export const Link = memo(function Link({
  children,
  className,
  isStyled = true,
  isHover = true,
  style,
  ...linkProps
}: LinkProps) {
  return (
    <a
      className={clsx(
        {
          link: isStyled,
          "link-hover": isHover,
        },
        style && LinkStyleClasses[style],
        className,
      )}
      {...linkProps}
    >
      {children}
    </a>
  );
});
