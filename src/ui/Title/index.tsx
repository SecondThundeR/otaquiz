import { memo, type PropsWithChildren } from "react";

export const Title = memo(function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-center text-4xl font-bold text-primary sm:text-5xl">
      {children}
    </h1>
  );
});
