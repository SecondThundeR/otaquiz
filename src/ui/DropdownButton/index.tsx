import type { PropsWithChildren } from "react";

import { Link } from "../Link";

type DropdownButtonProps = PropsWithChildren<{
  href?: string;
  to?: string;
  onClick?: () => void;
}>;

export function DropdownButton({ children, href, to, onClick }: DropdownButtonProps) {
  const isButton = !href;
  const linkRole = isButton ? "button" : undefined;
  const linkTarget = !isButton ? "_blank" : undefined;

  return (
    <li>
      <Link
        isStyled={false}
        isHover={false}
        href={href}
        to={to}
        role={linkRole}
        target={linkTarget}
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
