/*
WHAT:
TODO:
*/
import { Suspense } from "react";
import Image from "next/image";

interface Props {
  path: string;
  altText: string;
  isVideo: boolean;
  isRight: boolean;
  format: string;
}

export default function RectImage({ path, altText, isVideo, isRight, format }: Props) {
  return (
    <div className="relative -z-10 w-full mx-4 lg:mx-0 flex justify-center lg:block">
      <div className={`relative w-full lg:w-[140%] lg:-ml-[20%]
          ${format === "rect" && "aspect-[3/2.5]"}
          ${format === "square" && "aspect-[1/1] w-[80%] lg:w-[130%]"}
        `
       }>
        {isVideo ? 
          <video
          className="object-cover w-full h-full cover rounded-[30px]"
          src={path}
          autoPlay
          loop
          muted
        />
        :
          <Image 
          className="object-cover rounded-[30px]"
          src={path}
          alt={altText}
          fill={true}
        />
        }
      </div>
    </div>
  );
}
