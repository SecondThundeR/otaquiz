import { forwardRef, type PropsWithChildren } from "react";

export const PageContainer = forwardRef<HTMLDivElement, PropsWithChildren>(function PageContainer(
  { children },
  ref,
) {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-base-100" ref={ref}>
      {children}
    </main>
  );
});
