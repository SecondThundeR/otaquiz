import { memo, type FormHTMLAttributes, type PropsWithChildren } from "react";

interface FormContainerProps
  extends Pick<FormHTMLAttributes<HTMLFormElement>, "onSubmit">,
    PropsWithChildren {}

export const FormContainer = memo(function FormContainer({
  children,
  onSubmit,
}: FormContainerProps) {
  return (
    <form
      className="flex w-fit flex-col gap-2 rounded-xl bg-base-200 p-6 sm:max-w-2xl"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
});
