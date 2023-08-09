import { memo, useState } from "react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";

import { GITHUB_REPO_LINK } from "@/constants/links";

import { Button } from "@/ui/Button";
import { Spinner } from "@/ui/Spinner";

import { IconLink } from "./IconLink";
import { NavbarProfile } from "./Profile";
import { NavbarTitle, type NavbarTitleProps } from "./Title";

export interface NavbarProps extends NavbarTitleProps {
  user: Session["user"] | null;
  hasDropdown?: boolean;
}

const MemoizedNavbar = memo(function Navbar({
  user,
  hasDropdown,
  ...titleProps
}: NavbarProps) {
  const [isLogin, setIsLogin] = useState(false);

  const onSignIn = async () => {
    setIsLogin(true);
    await signIn("shikimori");
  };

  return (
    <div className="navbar sticky top-0 z-50 gap-4 bg-base-100 px-4">
      <NavbarTitle {...titleProps} />
      <IconLink icon={MarkGithubIcon} href={GITHUB_REPO_LINK} />
      {user !== null ? (
        <NavbarProfile hasDropdown={hasDropdown} {...user} />
      ) : (
        <Button style="primary" onClick={onSignIn} disabled={isLogin}>
          {isLogin ? <Spinner /> : "Вход в аккаунт"}
        </Button>
      )}
    </div>
  );
});

export const Navbar = Object.assign(MemoizedNavbar, {
  Profile: NavbarProfile,
  Title: NavbarTitle,
});
