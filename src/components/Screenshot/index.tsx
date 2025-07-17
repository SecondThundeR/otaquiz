import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

import { useOnImageLoad } from "@/hooks/useOnImageLoad";

import { ScreenshotPlaceholder } from "@/ui/ScreenshotPlaceholder";

const SCREENSHOT_CLASSES = "h-48 sm:h-56 rounded-xl object-cover";

interface ScreenshotProps {
  src?: string;
  fullWidth?: boolean;
}

export const Screenshot = memo(function Screenshot({ src, fullWidth = false }: ScreenshotProps) {
  const [isLoading, onLoad] = useOnImageLoad();

  if (!src) return null;

  return (
    <>
      <ScreenshotPlaceholder
        className={SCREENSHOT_CLASSES}
        isLoading={isLoading}
        fullWidth={fullWidth}
      />
      <Image
        width={1280}
        height={720}
        src={src}
        priority
        className={clsx(SCREENSHOT_CLASSES, {
          hidden: isLoading,
        })}
        alt=""
        onLoad={onLoad}
      />
    </>
  );
});
