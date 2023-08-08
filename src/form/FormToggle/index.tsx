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
      <label className="label cursor-pointer justify-between">
        <span className="label-text">{label}</span>
        <input type="checkbox" className="toggle toggle-primary" {...props} />
      </label>
    </div>
  );
});
