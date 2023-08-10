import { memo, type InputHTMLAttributes } from "react";

interface CheckboxProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange"> {
  label: string;
}

export const Checkbox = memo(function Checkbox({
  label,
  ...inputProps
}: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-4">
        <span className="label-text text-lg">{label}</span>
        <input
          type="checkbox"
          className="checkbox-primary checkbox"
          {...inputProps}
        />
      </label>
    </div>
  );
});
