//WHAT: inline image component

interface Props {
  path: string;
  alt: string;
  width: number;
  height: number;
}

import Image from "next/image"

export default function InlineImage({ path, alt, width, height }: Props) {
  return (
      
        <Image 
          className="pt-10 w-8/12 lg:w-full lg:p-0"
          src={path}
          width={width}
          height={height}
          alt={alt}
        />
       
  );
}
