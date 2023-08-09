import { memo, type PropsWithChildren } from "react";

export const Divider = memo(function Divider({ children }: PropsWithChildren) {
  return <div className="divider">{children}</div>;
});
