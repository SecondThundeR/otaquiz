import cn from "classnames";
import Image from "next/image";

import { SCREENSHOT_CLASSES } from "@/constants/screenshotClasses";
import { useOnImageLoad } from "@/hooks/useOnImageLoad";

import { ScreenshotPlaceholder } from "../ScreenshotPlaceholder";

function Screenshot({ src }: { src: string }) {
  const [isLoading, onLoad] = useOnImageLoad();

  return (
    <>
      <ScreenshotPlaceholder isLoading={isLoading} />
      <Image
        width={1280}
        height={720}
        src={src}
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
