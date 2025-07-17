import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type FormCheckboxContainerProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export function FormCheckboxContainer({ label, className, children }: FormCheckboxContainerProps) {
  return (
    <fieldset className={twMerge(clsx("fieldset w-full text-base", className))}>
      <legend className="fieldset-legend w-full px-1 py-2">{label}</legend>
      {children}
    </fieldset>
  );
}
