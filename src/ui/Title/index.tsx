import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return <h1 className="text-center font-bold text-4xl text-primary sm:text-5xl">{children}</h1>;
}
