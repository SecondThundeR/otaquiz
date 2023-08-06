import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { memo } from "react";

dayjs.extend(utc);

interface TimeFormatProps {
  time: Date;
  format: string;
}

export const TimeFormat = memo(function TimeFormat({
  time,
  format,
}: TimeFormatProps) {
  return <>{typeof window !== undefined && dayjs.utc(time).format(format)}</>;
});
