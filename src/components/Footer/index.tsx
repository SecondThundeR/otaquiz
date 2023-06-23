import { type PropsWithChildren } from "react";

export default function Footer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center gap-0 pb-4 sm:flex-row sm:gap-2">
      {children}
    </div>
  );
}
