import { type PropsWithChildren } from "react";
import clsx from "clsx";

type FormCheckboxContainerProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export function FormCheckboxContainer({
  label,
  className,
  children,
}: FormCheckboxContainerProps) {
  return (
    <div className={clsx("form-control w-full", className)}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
}
