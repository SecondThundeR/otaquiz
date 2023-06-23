import { type PropsWithChildren } from "react";

export function FooterLink({
  children,
  link,
}: PropsWithChildren & { link: string }) {
  return (
    <a className="link-hover link-primary link" href={link}>
      {children}
    </a>
  );
}
