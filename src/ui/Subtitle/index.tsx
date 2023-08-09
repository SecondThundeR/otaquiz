import { type PropsWithChildren } from "react";

export function Subtitle({ children }: PropsWithChildren) {
  return (
    <p className="text-center text-xl font-medium sm:text-2xl">{children}</p>
  );
}
