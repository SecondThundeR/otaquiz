import { type PropsWithChildren } from "react";

export function DropdownContent({ children }: PropsWithChildren) {
  return (
    <ul
      tabIndex={0}
      className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-56 border-2 border-base-content bg-base-100 p-2"
    >
      {children}
    </ul>
  );
}
