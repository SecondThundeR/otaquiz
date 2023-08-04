import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { type PropsWithChildren, memo } from "react";

const AlertProperties = {
  info: {
    icon: InformationCircleIcon,
    class: "alert-info",
  },
  error: {
    icon: ExclamationCircleIcon,
    class: "alert-error",
  },
};

type AlertProps = PropsWithChildren<{ type: keyof typeof AlertProperties }>;

export const Alert = memo(function Alert({ type, children }: AlertProps) {
  const { class: alertClass, icon: Icon } = AlertProperties[type];

  return (
    <div className={clsx("alert sm:max-w-lg", alertClass)}>
      <Icon className="hidden h-8 w-8 shrink-0 stroke-current sm:block" />
      <span>{children}</span>
    </div>
  );
});
