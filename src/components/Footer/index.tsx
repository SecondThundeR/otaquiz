import { memo, type PropsWithChildren } from "react";

import { FooterSeparator } from "./Separator";
import { FooterText } from "./Text";

const MemoizedFooter = memo(function Footer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center gap-0 pb-4 sm:flex-row sm:gap-2">
      {children}
    </div>
  );
});

export const Footer = Object.assign(MemoizedFooter, {
  Text: FooterText,
  Separator: FooterSeparator,
});
