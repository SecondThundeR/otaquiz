import { type PropsWithChildren } from "react";

export function FooterText({ children }: PropsWithChildren) {
  return <h1 className="text-center font-medium">{children}</h1>;
}
