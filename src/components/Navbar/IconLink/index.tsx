import { type Icon } from "@primer/octicons-react";
import { memo } from "react";

import { Link } from "@/components/ui/Link";

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
      <Icon className="h-7 w-7 hover:fill-primary" />
    </Link>
  );
});
