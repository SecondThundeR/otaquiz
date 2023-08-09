import { type PropsWithChildren } from "react";

export function ScreenshotsGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}
