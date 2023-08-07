import {
  forwardRef,
  memo,
  type ForwardedRef,
  type PropsWithChildren,
} from "react";

export const PageContainer = memo(
  forwardRef(function PageContainer(
    { children }: PropsWithChildren,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <main
        className="flex min-h-screen flex-col justify-center bg-base-100"
        ref={ref}
      >
        {children}
      </main>
    );
  }),
);
