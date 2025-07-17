import { ArrowLeftIcon } from "@primer/octicons-react";
import { memo, useState } from "react";

import { PAGE_TITLE } from "@/constants/pageHeadData";

import { LinkButton } from "@/ui/LinkButton";

export type NavbarTitleProps = Partial<{
  title: string;
  isHome: boolean;
  isButtonDisabled: boolean;
  onClick: () => void;
}>;

export const NavbarTitle = memo(function NavbarTitle({
  title,
  isHome = false,
  isButtonDisabled = false,
  onClick,
}: NavbarTitleProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const onLinkClick = () => {
    if (onClick === undefined) return;

    setIsRedirecting(true);
    onClick();
  };

  return (
    <LinkButton
      style="ghost"
      to="/"
      className="text-xl normal-case"
      disabled={isButtonDisabled || isRedirecting}
      onClick={onLinkClick}
    >
      {isHome ? (
        PAGE_TITLE
      ) : (
        <>
          <ArrowLeftIcon className="h-6 w-6" />
          {title ?? "На главную"}
        </>
      )}
    </LinkButton>
  );
});
