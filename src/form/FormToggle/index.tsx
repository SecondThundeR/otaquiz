import { memo, type InputHTMLAttributes } from "react";

interface FormToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormToggle = memo(function FormToggle({
  label,
  ...props
}: FormToggleProps) {
  return (
    <div className="form-control w-full">
      <label className="label w-full cursor-pointer justify-between">
        <span className="label-text text-base-content w-full px-1 py-2">
          {label}
        </span>
        <input type="checkbox" className="toggle toggle-primary" {...props} />
      </label>
    </div>
  );
});
