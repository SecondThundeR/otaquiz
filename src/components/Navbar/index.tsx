import { type Session } from "next-auth";
import { signIn } from "next-auth/react";
import { memo, useState } from "react";

import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import { NavbarProfile } from "./Profile";
import { NavbarTitle } from "./Title";

interface NavbarProps {
  user: Session["user"] | null;
  title?: string;
  onTitle?: () => void;
}

const MemoizedNavbar = memo(function Navbar({
  user,
  title,
  onTitle,
}: NavbarProps) {
  const [isLogin, setIsLogin] = useState(false);

  const onSignIn = async () => {
    setIsLogin(true);
    await signIn("shikimori");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 px-4">
      <NavbarTitle title={title} onClick={onTitle} />
      {user !== null ? (
        <NavbarProfile {...user} />
      ) : (
        <Button style="primary" onClick={onSignIn} disabled={isLogin}>
          {isLogin ? (
            <>
              <Spinner />
              Входим в аккаунт
            </>
          ) : (
            "Войти через Шикимори"
          )}
        </Button>
      )}
    </div>
  );
});

export const Navbar = Object.assign(MemoizedNavbar, {
  Profile: NavbarProfile,
  Title: NavbarTitle,
});
