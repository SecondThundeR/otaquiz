import { memo } from "react";
import { type Icon } from "@primer/octicons-react";

import { Link } from "@/ui/Link";

interface IconLinkProps {
  icon: Icon;
  href: string;
}

export const IconLink = memo(function IconLink({
  icon: Icon,
  href,
}: IconLinkProps) {
  return (
    <Link isStyled={false} isHover={false} href={href} target="_blank">
      <Icon className="h-6 w-6 hover:fill-primary" />
    </Link>
  );
});
