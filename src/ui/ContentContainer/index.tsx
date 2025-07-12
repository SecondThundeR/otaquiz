import { type PropsWithChildren } from "react";

export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto my-4 flex grow flex-col items-center justify-center gap-4 px-6">
      {children}
    </div>
  );
}
