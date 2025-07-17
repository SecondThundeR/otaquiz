import { AlertIcon, CircleSlashIcon, InfoIcon } from "@primer/octicons-react";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

const AlertProperties = {
  info: {
    icon: InfoIcon,
    class: "alert-info",
  },
  error: {
    icon: CircleSlashIcon,
    class: "alert-error",
  },
  warning: {
    icon: AlertIcon,
    class: "alert-warning",
  },
};

type AlertProps = PropsWithChildren<{
  type: keyof typeof AlertProperties;
  fullWidth?: boolean;
}>;

export function Alert({ type, fullWidth = false, children }: AlertProps) {
  const { class: alertClass, icon: Icon } = AlertProperties[type];

  return (
    <div
      className={clsx(
        "alert",
        {
          "sm:max-w-lg": !fullWidth,
          "w-full": fullWidth,
        },
        alertClass,
      )}
    >
      <Icon className="hidden h-6 w-6 sm:block" />
      <span>{children}</span>
    </div>
  );
}
