import { forwardRef, type PropsWithChildren } from "react";

export const PageContainer = forwardRef<HTMLDivElement, PropsWithChildren>(
  function PageContainer({ children }, ref) {
    return (
      <main
        className="bg-base-100 flex min-h-screen flex-col justify-center"
        ref={ref}
      >
        {children}
      </main>
    );
  },
);
