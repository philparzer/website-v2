/*
WHAT:
TODO:
*/

import Image from "next/image"

interface Props {
  path: string,
  altText: string,
}
  
export default function RectImage({path, altText}:Props) {
  return (
    <div className="relative -z-10 w-full mx-4 lg:mx-0">
      <div className="relative rounded-[30px] w-full lg:w-[140%] aspect-[3/2.5] lg:-ml-[20%]">
        <Image 
          className="object-contain"
          src={path}
          alt={altText}
          fill={true}
        />
      </div>
    </div>
  )
};
