import dayjs from "dayjs";
import { memo } from "react";

interface TimeFormatProps {
  time: Date;
  locale: string;
  format: string;
}

export const TimeFormat = memo(function TimeFormat({
  time,
  locale,
  format,
}: TimeFormatProps) {
  return (
    <>
      {typeof window !== undefined && dayjs(time).locale(locale).format(format)}
    </>
  );
});
