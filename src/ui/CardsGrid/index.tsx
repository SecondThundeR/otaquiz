import { memo, type PropsWithChildren } from "react";

export const CardsGrid = memo(function ResultAnswersGrid({
  children,
}: PropsWithChildren) {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
});