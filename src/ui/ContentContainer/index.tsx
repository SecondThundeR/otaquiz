import { memo, type PropsWithChildren } from "react";

export const ContentContainer = memo(function ContentContainer({
  children,
}: PropsWithChildren) {
  return (
    <div className="container mx-auto my-8 flex flex-grow flex-col items-center justify-center gap-5 px-6 sm:px-0">
      {children}
    </div>
  );
});
