import { type PropsWithChildren, memo } from "react";

import { Link } from "../Link";

type DropdownButtonProps = PropsWithChildren<{
  href?: string;
  onClick?: () => void;
}>;

export const DropdownButton = memo(function DropdownButton({
  children,
  href,
  onClick,
}: DropdownButtonProps) {
  const isButton = !href;

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
