import { ArrowLeftIcon } from "@primer/octicons-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { PAGE_TITLE } from "@/constants/pageHeadData";

import { LinkButton } from "@/ui/LinkButton";

export type NavbarTitleProps = Partial<{
  title: string;
  isHome: boolean;
  isButtonDisabled: boolean;
  onClick: () => void;
}>;

export const NavbarTitle = ({
  title,
  isHome = false,
  isButtonDisabled = false,
  onClick,
}: NavbarTitleProps) => {
  const session = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isLoggedIn = session.status === "authenticated";

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
      {!isLoggedIn || isHome ? (
        PAGE_TITLE
      ) : (
        <>
          <ArrowLeftIcon className="h-6 w-6" />
          {title ?? "На главную"}
        </>
      )}
    </LinkButton>
  );
};
