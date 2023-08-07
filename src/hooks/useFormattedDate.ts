import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export function useFormattedDate(date: Date, format: string) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    setFormattedDate(DateTime.fromJSDate(date).toFormat(format));
  }, [date, format]);

  return formattedDate;
}
