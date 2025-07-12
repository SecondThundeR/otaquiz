import { type PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-primary text-center text-4xl font-bold sm:text-5xl">
      {children}
    </h1>
  );
}
