import { memo, type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput = memo(function FormInput({
  label,
  ...props
}: FormInputProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input {...props} />
    </div>
  );
});
