/*
WHAT:
"Folder" items that are rendered inside map in glassmorphic content box on index, used as links to projects
*/

import rgbHex from "rgb-hex";
import Image from "next/image";

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

  console.log(name.length)

  return (
    <div className="flex flex-col w-[127px] overflow-hidden"> {/*TODO: Look into height*/}
      <div className="">
        <div className="relative h-[100px] left-[9px]">
          <div
            className={`w-[106px] h-[73px] opacity-70 left-[9px] absolute rounded-[15px]`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></div>
          <div
            className={`w-[106px] h-[73px] opacity-70 absolute top-[9px] rounded-[15px]`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center">
        <a href={url}>
          <div className="flex gap-2 items-center">
            <div>
              <Image width={21} height={21} src={logoPath} alt={altText} />
            </div>
            { name.length > 20
            ?
            <div>
              <div className="text-container">
                <span className="text-scroll">{name}</span>
              </div>
            </div>
            :
            <div className="overflow-x-hidden"><span className="">{name}</span></div>
            }
          </div>
        </a>
      </div>
    </div>
  );
}
