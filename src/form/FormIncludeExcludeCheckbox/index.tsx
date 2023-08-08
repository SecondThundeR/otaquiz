import { memo, type InputHTMLAttributes } from "react";
import clsx from "clsx";

import { Button } from "@/ui/Button";

interface FormIncludeExcludeCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isChecked: boolean;
  isExcluded: boolean;
  setIsExcluded: () => void;
}

export const FormIncludeExcludeCheckbox = memo(
  function FormIncludeExcludeCheckbox({
    label,
    isChecked,
    isExcluded,
    setIsExcluded,
    ...props
  }: FormIncludeExcludeCheckboxProps) {
    return (
      <label className="label cursor-pointer justify-between gap-4">
        <div className="flex items-center gap-4">
          <input type="checkbox" className="checkbox" {...props} />
          <span className="label-text">{label}</span>
        </div>
        <Button
          style="ghost"
          size="sm"
          className={clsx("normal-case text-primary", {
            invisible: !isChecked,
            visible: isChecked,
          })}
          type="button"
          onClick={setIsExcluded}
        >
          {isExcluded ? "Добавить" : "Исключить"}
        </Button>
      </label>
    );
  },
);
