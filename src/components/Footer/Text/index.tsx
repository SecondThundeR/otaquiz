import { type PropsWithChildren } from "react";

export const FooterText = ({ children }: PropsWithChildren) => (
  <h1 className="text-center font-medium">{children}</h1>
);
