import { Screenshot } from "@/components/Screenshot";

import type { AnimeScreenshots } from "@/schemas/animeScreenshots";

interface QuestionScreenshotsProps {
  screenshots?: AnimeScreenshots;
}

export const QuestionScreenshots = ({ screenshots }: QuestionScreenshotsProps) => {
  const screenshotsContent = screenshots?.map((screenshot) => (
    <Screenshot key={screenshot.id} src={screenshot.originalUrl} fullWidth />
  ));

  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {screenshotsContent}
    </div>
  );
};
