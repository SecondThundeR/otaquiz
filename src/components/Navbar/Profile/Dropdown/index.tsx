import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { memo } from "react";

import { SHIKIMORI_URL } from "@/constants/links";

import { DropdownButton } from "@/ui/DropdownButton";
import { DropdownContent } from "@/ui/DropdownContent";

type ProfileDropdownProps = Pick<Session["user"], "name">;

export const ProfileDropdown = memo(function ProfileDropdown({ name }: ProfileDropdownProps) {
  const onSignOut = () => signOut();

  return (
    <DropdownContent>
      {name && (
        <DropdownButton href={`${SHIKIMORI_URL}${name}`}>Профиль на Shikimori</DropdownButton>
      )}
      <DropdownButton to="/history">История</DropdownButton>
      <DropdownButton onClick={onSignOut}>Выйти</DropdownButton>
    </DropdownContent>
  );
});
