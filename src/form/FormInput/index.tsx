import { memo, type InputHTMLAttributes } from "react";
import clsx from "clsx";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput = memo(function FormInput({
  label,
  className,
  id,
  ...props
}: FormInputProps) {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label w-full">
        <span className="label-text text-base-content w-full px-1 py-2">
          {label}
        </span>
      </label>
      <input id={id} {...props} className={clsx("w-full", className)} />
    </div>
  );
});
