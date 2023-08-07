import { memo, type PropsWithChildren } from "react";

export const CardContainer = memo(function CardContainer({
  children,
}: PropsWithChildren) {
  return (
    <div className="min-h-8 flex w-full flex-col gap-4 rounded-2xl border-2 border-base-content px-5 py-4">
      {children}
    </div>
  );
});
