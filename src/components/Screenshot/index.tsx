import Image from "next/image";

function Screenshot({ src, blurSrc }: { src: string; blurSrc: string }) {
  return (
    <Image
      width={1280}
      height={720}
      src={src}
      placeholder="blur"
      blurDataURL={blurSrc}
      priority
      className="h-auto w-96 rounded-xl"
      alt=""
    />
  );
}

export default Screenshot;
