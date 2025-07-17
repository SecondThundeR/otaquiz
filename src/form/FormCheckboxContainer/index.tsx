import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type FormCheckboxContainerProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export function FormCheckboxContainer({ label, className, children }: FormCheckboxContainerProps) {
  return (
    <div className={twMerge(clsx("form-control w-full", className))}>
      {/** biome-ignore lint/a11y/noLabelWithoutControl: This is currently not needed */}
      <label className="label w-full">
        <span className="label-text w-full px-1 py-2 text-base-content">{label}</span>
      </label>
      {children}
    </div>
  );
}
