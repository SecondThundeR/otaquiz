import type { Session } from "next-auth";
import { memo } from "react";

import { UserAvatar } from "@/ui/UserAvatar";

import { ProfileDropdown } from "./Dropdown";

interface NavbarProfileProps extends Pick<Session["user"], "name" | "image"> {
  hasDropdown?: boolean;
}

export const NavbarProfile = memo(function NavbarProfile({
  name,
  image,
  hasDropdown = true,
}: NavbarProfileProps) {
  return (
    <div className="dropdown dropdown-end">
      <UserAvatar image={image} name={name} />
      {hasDropdown && <ProfileDropdown name={name} />}
    </div>
  );
});
