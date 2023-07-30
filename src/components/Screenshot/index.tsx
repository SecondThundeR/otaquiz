import Image from "next/image";

function Screenshot({ src }: { src: string }) {
  return (
    <Image
      width={1280}
      height={720}
      src={src}
      priority
      className="h-auto w-96 rounded-xl"
      alt=""
    />
  );
}

export default Screenshot;
