import { type PropsWithChildren, memo } from "react";

export const PageContainer = memo(function PageContainer({
  children,
}: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-base-100">
      {children}
    </main>
  );
});
