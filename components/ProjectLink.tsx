/*
WHAT:
"Folder" items that are rendered inside map in glassmorphic content box on index, used as links to projects
*/

import rgbHex from "rgb-hex";
import Image from "next/image";
import Link from "next/link";

interface Props {
  url: string;
  color: string;
  name: string;
  altText: string;
  logoPath: string;
}

export default function ProjectLink({
  url,
  color,
  name,
  altText,
  logoPath,
}: Props) {

  return (
    <div className="flex flex-col w-[127px] font-roboto group">
      <Link href={url}>
      <div className="">
        <div className="relative h-[100px] left-[9px]">
          <div
            className={`w-[106px] h-[73px] opacity-70 left-[9px] absolute rounded-[15px] transition-all duration-500 group-hover:animate-folderBounce group-hover:-mt-2`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></div>
          <div
            className={`w-[106px] h-[73px] opacity-70 absolute top-[9px] rounded-[15px] transition-all duration-500 delay-75 group-hover:animate-folderBounceDelayed group-hover:-mt-2`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center">
          <div className="flex gap-2 items-center">
            <div>
              <Image width={21} height={21} src={logoPath} alt={altText} />
            </div>
            { name.length > 20
            ?
            <div className="">
              <div className="text-container">
                <span className="text-scroll">{name}</span>
              </div>
            </div>
            :
            <div className="overflow-x-hidden"><span className="">{name}</span></div>
            }
          </div>
      </div>
      </Link>
    </div>
  );
}
