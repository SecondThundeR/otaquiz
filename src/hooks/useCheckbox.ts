import { type ChangeEvent, useState } from "react";

export function useCheckbox() {
  const [checked, isChecked] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    isChecked(event.currentTarget.checked);
  };

  return { checked, onChange };
}
