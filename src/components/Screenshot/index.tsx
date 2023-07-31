import cn from "classnames";
import Image from "next/image";

import { SCREENSHOT_CLASSES } from "@/constants/screenshotClasses";
import { useOnImageLoad } from "@/hooks/useOnImageLoad";

import { ScreenshotPlaceholder } from "../ScreenshotPlaceholder";

interface ScreenshotProps {
  src: string;
  fullWidth?: boolean;
}

function Screenshot({ src, fullWidth = false }: ScreenshotProps) {
  const [isLoading, onLoad] = useOnImageLoad();

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
        className={cn(SCREENSHOT_CLASSES, {
          hidden: isLoading,
        })}
        alt=""
        onLoadingComplete={onLoad}
      />
    </>
  );
}

export default Screenshot;
