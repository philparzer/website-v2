//WHAT: inline image component

interface Props {
  path: string;
  alt: string;
  width: number;
  height: number;
  isVideo: boolean;
}

import Image from "next/image";

export default function InlineImage({
  path,
  alt,
  width,
  height,
  isVideo,
}: Props) {
  return (
    <>
      {isVideo ? (
        <>
          <video
            className="object-cover w-full h-full cover"
            src={path}
            autoPlay
            loop
            muted
          />
        </>
      ) : (
        <>
          <Image
            className="pt-10 w-8/12 lg:w-full lg:p-0"
            src={path}
            width={width}
            height={height}
            alt={alt}
          />
        </>
      )}
    </>
  );
}
