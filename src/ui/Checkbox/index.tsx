import { type InputHTMLAttributes, memo } from "react";

interface CheckboxProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange" | "disabled"> {
  label: string;
}

export const Checkbox = memo(function Checkbox({ label, ...inputProps }: CheckboxProps) {
  return (
    <div className="form-control px-1 py-2">
      <label className="label cursor-pointer gap-4">
        <span className="label-text text-base-content sm:text-lg">{label}</span>
        <input type="checkbox" className="checkbox-primary checkbox" {...inputProps} />
      </label>
    </div>
  );
});
