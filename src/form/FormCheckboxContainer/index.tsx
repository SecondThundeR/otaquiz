import { memo, type PropsWithChildren } from "react";
import clsx from "clsx";

type FormCheckboxContainerProps = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export const FormCheckboxContainer = memo(function FormCheckboxContainer({
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
});
