import { memo, useState } from "react";

import { PAGE_TITLE } from "@/constants/pageHeadData";

import { LinkButton } from "@/ui/LinkButton";

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
    <LinkButton
      style={isHome ? "ghost" : "neutral"}
      to="/"
      className="text-xl normal-case"
      disabled={isDisabled}
      onClick={onLinkClick}
    >
      {isHome ? PAGE_TITLE : title ?? "Вернуться домой"}
    </LinkButton>
  );
});
