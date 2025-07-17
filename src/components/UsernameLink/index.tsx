import type { Session } from "next-auth";
import { memo } from "react";

import { SHIKIMORI_URL } from "@/constants/links";

import { Link } from "@/ui/Link";

type UsernameLinkProps = Pick<Session["user"], "name">;

export const UsernameLink = memo(function UsernameLink({ name }: UsernameLinkProps) {
  if (!name) return "Аноним";

  return (
    <Link style="primary" href={`${SHIKIMORI_URL}${name}`} target="_blank">
      {name}
    </Link>
  );
});
