import clsx from "clsx";
import { default as NextLink } from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

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
  "href" | "role" | "target" | "className"
> &
  PropsWithChildren<{
    to?: string;
    isStyled?: boolean;
    isHover?: boolean;
    style?: LinkStyleVariants;
    onClick?: () => void;
  }>;

export function Link({
  children,
  className,
  href,
  to,
  isStyled = true,
  isHover = true,
  style,
  ...rest
}: LinkProps) {
  if (to)
    return (
      <NextLink
        href={to}
        className={twMerge(
          clsx(
            {
              link: isStyled,
              "link-hover": isHover,
            },
            style && LinkStyleClasses[style],
            className,
          ),
        )}
        {...rest}
      >
        {children}
      </NextLink>
    );

  if (href) {
    return (
      <a
        className={twMerge(
          clsx(
            {
              link: isStyled,
              "link-hover": isHover,
            },
            style && LinkStyleClasses[style],
            className,
          ),
        )}
        href={href}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={twMerge(
        clsx(
          {
            link: isStyled,
            "link-hover": isHover,
          },
          style && LinkStyleClasses[style],
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
