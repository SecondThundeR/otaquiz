import { type PropsWithChildren } from "react";

export default function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto flex flex-grow flex-col items-center justify-center gap-5 px-6 sm:px-0">
      {children}
    </div>
  );
}
