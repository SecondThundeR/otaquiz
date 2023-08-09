import { memo, type PropsWithChildren } from "react";

export const FormCheckboxContainer = memo(function FormCheckboxContainer({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
});
