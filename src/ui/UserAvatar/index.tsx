import { memo } from "react";
import Image from "next/image";
import clsx from "clsx";
import { type Session } from "next-auth";

type UserAvatarProps = Pick<Session["user"], "image" | "name">;

export const UserAvatar = memo(function UserAvatar({
  image,
  name,
}: UserAvatarProps) {
  const userName = name?.at(0) ?? "?";
  const userNameAlt = `Аватар аккаунта ${name ?? "Аноним"}`;

  return (
    <label
      tabIndex={0}
      className={clsx("avatar btn btn-circle btn-ghost", {
        placeholder: !image,
      })}
    >
      <div
        className={clsx("w-10 rounded-full", {
          "bg-primary text-neutral-content": !image,
        })}
      >
        {image ? (
          <Image width={40} height={40} src={image} alt={userNameAlt} />
        ) : (
          <span className="text-xl">{userName}</span>
        )}
      </div>
    </label>
  );
});
