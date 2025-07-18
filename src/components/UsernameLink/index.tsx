import type { Session } from "next-auth";

import { SHIKIMORI_URL } from "@/constants/links";

import { Link } from "@/ui/Link";

type UsernameLinkProps = Pick<Session["user"], "name">;

export const UsernameLink = ({ name }: UsernameLinkProps) => {
  if (!name) return "Аноним";

  return (
    <Link style="primary" href={`${SHIKIMORI_URL}${name}`} target="_blank">
      {name}
    </Link>
  );
};
