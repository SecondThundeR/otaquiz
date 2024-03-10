import { type AnchorHTMLAttributes, type PropsWithChildren } from "react";
import { default as NextLink } from "next/link";
import clsx from "clsx";

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

export type LinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "role" | "target" | "onClick" | "className"
> &
  PropsWithChildren<{
    to?: string;
    isStyled?: boolean;
    isHover?: boolean;
    style?: LinkStyleVariants;
  }>;

export function Link({
  children,
  className,
  href,
  to,
  isStyled = true,
  isHover = true,
  style,
  ...linkProps
}: LinkProps) {
  if (to)
    return (
      <NextLink
        href={to}
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
      </NextLink>
    );

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
      href={href}
      {...linkProps}
    >
      {children}
    </a>
  );
}
