import type { PropsWithChildren } from "react";

export function Subtitle({ children }: PropsWithChildren) {
  return <p className="text-center font-medium text-xl sm:text-2xl">{children}</p>;
}
