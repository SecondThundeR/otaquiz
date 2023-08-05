import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { memo } from "react";

import { SHIKIMORI_URL } from "@/constants/links";

import { DropdownButton } from "../../ui/DropdownButton";
import { DropdownContent } from "../../ui/DropdownContent";
import { UserAvatar } from "../../ui/UserAvatar";

type NavbarProfileProps = Pick<Session["user"], "name" | "image">;

export const NavbarProfile = memo(function NavbarProfile({
  name,
  image,
}: NavbarProfileProps) {
  const onSignOut = () => signOut();

  return (
    <div className="dropdown dropdown-end">
      <UserAvatar image={image} name={name} />
      <DropdownContent>
        {name && (
          <DropdownButton href={`${SHIKIMORI_URL}${name}`}>
            Профиль на Shikimori
          </DropdownButton>
        )}
        <DropdownButton to="/history">История</DropdownButton>
        <DropdownButton onClick={onSignOut}>Выйти</DropdownButton>
      </DropdownContent>
    </div>
  );
});
