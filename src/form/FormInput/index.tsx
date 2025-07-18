import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput = ({ label, className, id, ...props }: FormInputProps) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="label w-full">
        <span className="label-text w-full px-1 py-2 text-base-content">{label}</span>
      </label>
      <input id={id} {...props} className={twMerge(clsx("w-full text-base", className))} />
    </div>
  );
};
