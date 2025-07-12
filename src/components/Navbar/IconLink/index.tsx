import { memo } from "react";
import { type Icon } from "@primer/octicons-react";

import { Link } from "@/ui/Link";

interface NavbarIconLinkProps {
  icon: Icon;
  href: string;
}

export const NavbarIconLink = memo(function NavbarIconLink({
  icon: Icon,
  href,
}: NavbarIconLinkProps) {
  return (
    <Link isStyled={false} isHover={false} href={href} target="_blank">
      <Icon className="hover:fill-primary h-6 w-6" />
    </Link>
  );
});
