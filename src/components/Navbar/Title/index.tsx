import { memo, useState } from "react";
import clsx from "clsx";

import { PAGE_TITLE } from "@/constants/pageHeadData";

import { Link } from "@/ui/Link";

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
  const [isDisabled, setIsDisabled] = useState(false);

  const onLinkClick = () => {
    if (onClick === undefined) return;
    setIsDisabled(true);
    onClick();
  };

  return (
    <div className="flex-grow">
      <Link
        isStyled={false}
        isHover={false}
        to="/"
        className={clsx("btn btn-ghost text-xl normal-case", {
          "btn-disabled": isDisabled,
        })}
        onClick={onLinkClick}
      >
        {isHome ? PAGE_TITLE : title ?? "Вернуться домой"}
      </Link>
    </div>
  );
});
