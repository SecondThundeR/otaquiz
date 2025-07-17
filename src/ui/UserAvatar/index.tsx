import clsx from "clsx";
import Image from "next/image";
import type { Session } from "next-auth";
import { memo } from "react";

type UserAvatarProps = Pick<Session["user"], "image" | "name">;

export const UserAvatar = memo(function UserAvatar({ image, name }: UserAvatarProps) {
  const userName = name?.at(0) ?? "?";
  const userNameAlt = `Аватар аккаунта ${name ?? "Аноним"}`;

  return (
    <button
      type="button"
      className={clsx("avatar btn btn-circle btn-ghost", {
        placeholder: !image,
      })}
    >
      <div
        className={clsx("w-9 rounded-full", {
          "bg-primary text-base-content": !image,
        })}
      >
        {image ? (
          <Image width={40} height={40} src={image} alt={userNameAlt} />
        ) : (
          <span className="text-xl">{userName}</span>
        )}
      </div>
    </button>
  );
});
