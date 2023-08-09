import { memo, type PropsWithChildren } from "react";

export const ButtonsGrid = memo(function ButtonsGrid({
  children,
}: PropsWithChildren) {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
});
