import type { PropsWithChildren } from "react";

export function Divider({ children }: PropsWithChildren) {
  return <div className="divider">{children}</div>;
}
