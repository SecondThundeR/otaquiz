import { memo, useMemo } from "react";

import { Screenshot } from "@/components/Screenshot";

import type { AnimeScreenshots } from "@/schemas/animeScreenshots";

interface QuestionScreenshotsProps {
  screenshots?: AnimeScreenshots;
}

export const QuestionScreenshots = memo(function QuestionScreenshots({
  screenshots,
}: QuestionScreenshotsProps) {
  const screenshotsContent = useMemo(
    () =>
      screenshots?.map((screenshot) => (
        <Screenshot key={screenshot.id} src={screenshot.originalUrl} fullWidth />
      )),
    [screenshots],
  );

  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {screenshotsContent}
    </div>
  );
});
