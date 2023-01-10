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
    <div className="max-w-xs pt-5">
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
            className="object-cover w-full h-full cover"
            src={path}
            width={width}
            height={height}
            alt={alt}
          />
        </>
      )}
    </div>
  );
}
