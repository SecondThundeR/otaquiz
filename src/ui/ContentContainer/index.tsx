import { type PropsWithChildren } from "react";

export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto mb-6 mt-7 flex flex-grow flex-col items-center justify-center gap-5 px-6">
      {children}
    </div>
  );
}
