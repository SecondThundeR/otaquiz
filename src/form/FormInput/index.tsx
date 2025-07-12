import clsx from "clsx";
import { memo, type InputHTMLAttributes } from "react";

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
        <span className="label-text text-black dark:text-white w-full py-2 px-1">{label}</span>
      </label>
      <input id={id} {...props} className={clsx("w-full", className)} />
    </div>
  );
});
