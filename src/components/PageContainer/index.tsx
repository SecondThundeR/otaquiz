import { type PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-base-100">
      {children}
    </main>
  );
}
