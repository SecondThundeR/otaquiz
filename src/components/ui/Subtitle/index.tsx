import { type PropsWithChildren, memo } from "react";

export const Subtitle = memo(function Subtitle({
  children,
}: PropsWithChildren) {
  return (
    <p className="text-center text-xl font-medium sm:text-2xl">{children}</p>
  );
});
