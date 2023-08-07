import { memo, type PropsWithChildren } from "react";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";
import clsx from "clsx";

const AlertProperties = {
  info: {
    icon: InfoIcon,
    class: "alert-info",
  },
  error: {
    icon: AlertIcon,
    class: "alert-error",
  },
};

type AlertProps = PropsWithChildren<{ type: keyof typeof AlertProperties }>;

export const Alert = memo(function Alert({ type, children }: AlertProps) {
  const { class: alertClass, icon: Icon } = AlertProperties[type];

  return (
    <div className={clsx("alert sm:max-w-lg", alertClass)}>
      <Icon className="hidden h-6 w-6 sm:block" />
      <span>{children}</span>
    </div>
  );
});
