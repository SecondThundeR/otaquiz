import type { PropsWithChildren } from "react";

export function CardsGrid({ children }: PropsWithChildren) {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}
