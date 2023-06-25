import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type PropsWithChildren } from "react";

type SessionUser = Pick<Session, "user">["user"];

function NavbarTitle({ children }: PropsWithChildren) {
  return (
    <div className="flex-1">
      <Link className="btn-ghost btn text-xl normal-case" href="/">
        {children}
      </Link>
    </div>
  );
}

function NavbarProfile({
  name,
  image,
}: {
  name: SessionUser["name"];
  image: SessionUser["image"];
}) {
  return (
    <div className="dropdown-end dropdown">
      {image !== undefined ? (
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image
              width={40}
              height={40}
              src={image || ""}
              alt="Аватар аккаунта"
            />
          </div>
        </label>
      ) : (
        <label
          tabIndex={0}
          className="placeholder btn-ghost btn-circle avatar btn"
        >
          <div className="w-10 rounded-full bg-primary text-neutral-content">
            <span className="text-xl">{name?.at(0) || "?"}</span>
          </div>
        </label>
      )}
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-56 border-2 border-base-content bg-base-100 p-2"
      >
        {name && (
          <li>
            <a
              className="justify-between"
              href={`https://shikimori.me/${name}`}
              target="_blank"
            >
              Профиль на Shikimori
            </a>
          </li>
        )}
        <li>
          <a role="button" onClick={() => signOut()}>
            Выйти
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar({ user }: { user: SessionUser | undefined }) {
  return (
    <div className="navbar bg-base-100 px-4">
      <NavbarTitle>AniGuessr</NavbarTitle>
      {user !== undefined ? (
        <NavbarProfile name={user?.name} image={user?.image} />
      ) : (
        <button className="btn-primary btn" onClick={() => signIn("shikimori")}>
          Войти через Шикимори
        </button>
      )}
    </div>
  );
}
