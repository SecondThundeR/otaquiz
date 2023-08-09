import { memo, useState } from "react";
import { MarkGithubIcon } from "@primer/octicons-react";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";

import { GITHUB_REPO_LINK } from "@/constants/links";

import { Button } from "@/ui/Button";
import { Spinner } from "@/ui/Spinner";

import { NavbarIconLink } from "./IconLink";
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
      <div className="navbar-start">
        <NavbarTitle {...titleProps} />
      </div>
      <div className="navbar-end gap-4">
        <NavbarIconLink icon={MarkGithubIcon} href={GITHUB_REPO_LINK} />
        {user !== null ? (
          <NavbarProfile hasDropdown={hasDropdown} {...user} />
        ) : (
          <Button style="primary" onClick={onSignIn} disabled={isLogin}>
            {isLogin ? <Spinner /> : "Вход в аккаунт"}
          </Button>
        )}
      </div>
    </div>
  );
});

export const Navbar = Object.assign(MemoizedNavbar, {
  Profile: NavbarProfile,
  Title: NavbarTitle,
});
