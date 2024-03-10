import { type FormHTMLAttributes, type PropsWithChildren } from "react";

type FormContainerProps = Pick<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> &
  PropsWithChildren;

export function FormContainer({ children, onSubmit }: FormContainerProps) {
  return (
    <form
      className="flex w-fit flex-col gap-2 rounded-xl bg-base-200 p-6 lg:w-5/6 xl:w-4/6 2xl:w-7/12"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
