import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { type PropsWithChildren } from "react";

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

interface AlertProps extends PropsWithChildren {
  state: keyof typeof AlertProperties;
}

export default function Alert({ state, children }: AlertProps) {
  const alertProps = AlertProperties[state];

  return (
    <div className={`alert ${alertProps.class} sm:max-w-lg`}>
      <alertProps.icon className="hidden h-8 w-8 shrink-0 stroke-current sm:block" />
      <span>{children}</span>
    </div>
  );
}
