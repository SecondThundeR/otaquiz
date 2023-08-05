import { memo } from "react";

import { Link } from "@/components/ui/Link";

import { PAGE_TITLE } from "@/constants/pageHeadData";

interface NavbarTitleProps {
  title?: string;
  onClick?: () => void;
}

export const NavbarTitle = memo(function NavbarTitle({
  title,
  onClick,
}: NavbarTitleProps) {
  return (
    <div className="flex-grow">
      <Link
        isStyled={false}
        isHover={false}
        to="/"
        className="btn btn-ghost text-xl normal-case"
        onClick={onClick}
      >
        {title ?? PAGE_TITLE}
      </Link>
    </div>
  );
});
