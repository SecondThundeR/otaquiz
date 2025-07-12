import { type PropsWithChildren } from "react";

export function CardContainer({ children }: PropsWithChildren) {
  return (
    <div className="border-base-content flex min-h-8 w-full flex-col gap-4 rounded-2xl border-2 p-4">
      {children}
    </div>
  );
}
