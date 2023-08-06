import { memo } from "react";

import { Link } from "@/components/ui/Link";

import { PAGE_TITLE } from "@/constants/pageHeadData";

export interface NavbarTitleProps {
  title?: string;
  isHome?: boolean;
  onClick?: () => void;
}

export const NavbarTitle = memo(function NavbarTitle({
  title,
  isHome = false,
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
        {!isHome ? "Вернуться домой" : title ?? PAGE_TITLE}
      </Link>
    </div>
  );
});
