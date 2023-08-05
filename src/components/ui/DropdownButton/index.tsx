import { default as NextLink } from "next/link";
import { type PropsWithChildren, memo } from "react";

import { Link } from "../Link";

type DropdownButtonProps = PropsWithChildren<{
  href?: string;
  to?: string;
  onClick?: () => void;
}>;

export const DropdownButton = memo(function DropdownButton({
  children,
  href,
  to,
  onClick,
}: DropdownButtonProps) {
  const isButton = !href;
  const linkRole = isButton ? "button" : undefined;
  const linkTarget = !isButton ? "_blank" : undefined;

  if (to)
    return (
      <li>
        <NextLink
          href={to}
          role={linkRole}
          target={linkTarget}
          onClick={onClick}
        >
          {children}
        </NextLink>
      </li>
    );

  return (
    <li>
      <Link
        isStyled={false}
        isHover={false}
        href={href}
        role={linkRole}
        target={linkTarget}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
});
