import { memo } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

import { SHIKIMORI_URL } from "@/constants/links";

import { DropdownButton } from "@/ui/DropdownButton";
import { DropdownContent } from "@/ui/DropdownContent";
import { UserAvatar } from "@/ui/UserAvatar";

interface NavbarProfileProps extends Pick<Session["user"], "name" | "image"> {
  hasDropdown?: boolean;
}

export const NavbarProfile = memo(function NavbarProfile({
  name,
  image,
  hasDropdown = true,
}: NavbarProfileProps) {
  const onSignOut = () => signOut();

  return (
    <div className="dropdown dropdown-end">
      <UserAvatar image={image} name={name} />
      {hasDropdown && (
        <DropdownContent>
          {name && (
            <DropdownButton href={`${SHIKIMORI_URL}${name}`}>
              Профиль на Shikimori
            </DropdownButton>
          )}
          <DropdownButton to="/history">История</DropdownButton>
          <DropdownButton onClick={onSignOut}>Выйти</DropdownButton>
        </DropdownContent>
      )}
    </div>
  );
});
