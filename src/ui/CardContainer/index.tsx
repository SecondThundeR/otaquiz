import type { PropsWithChildren } from "react";

export function CardContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-8 w-full flex-col gap-4 rounded-2xl border-2 border-base-content p-4">
      {children}
    </div>
  );
}
