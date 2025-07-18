import type { PropsWithChildren, RefObject } from "react";

interface PageContainerProps extends PropsWithChildren {
  ref?: RefObject<HTMLDivElement | null>;
}

export const PageContainer = ({ ref, children }: PageContainerProps) => {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-base-100" ref={ref}>
      {children}
    </main>
  );
};
