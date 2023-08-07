import { memo, type PropsWithChildren } from "react";

export const FooterText = memo(function FooterText({
  children,
}: PropsWithChildren) {
  return <h1 className="text-center font-medium">{children}</h1>;
});
