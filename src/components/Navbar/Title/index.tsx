import { default as NextLink } from "next/link";
import { memo } from "react";

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
      <NextLink
        className="btn btn-ghost text-xl normal-case"
        href="/"
        onClick={onClick}
      >
        {title ?? PAGE_TITLE}
      </NextLink>
    </div>
  );
});
