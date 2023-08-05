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

  if (to)
    return (
      <li>
        <NextLink href={to}>{children}</NextLink>
      </li>
    );

  return (
    <li>
      <Link
        isStyled={false}
        isHover={false}
        href={href}
        role={isButton ? "button" : undefined}
        target={!isButton ? "_blank" : undefined}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
});
