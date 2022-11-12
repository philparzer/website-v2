/*
WHAT:
"Folder" items that are rendered inside map in glassmorphic content box on index, used as links to projects
*/

import rgbHex from "rgb-hex";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface DatabaseProject {
  project: string;
  faves: number;
}

interface Props {
  url: string;
  color: string;
  name: string;
  altText: string;
  logoPath: string;
  favoriteProjects?: DatabaseProject
}

const parent:any = {
  "while": {
    transition: {
      staggerChildren: 0.1
    },
  }
}

const background:any = {
  "while": {
    y: -10,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      type: "ease-in-out",
      duration: 0.45
    }
  }
}


export default function ProjectLink({ url, color, name, altText, logoPath, favoriteProjects}: Props) {

  return (
    <motion.div 
      className="flex flex-col w-[127px] font-roboto"
      whileHover="while"
    >
      <Link href={url}>
      <div className="">
        <motion.div className="relative h-[100px] left-[9px]" variants={parent}>
          <motion.div
            variants={background}
            className={`w-[106px] h-[73px] opacity-70 left-[9px] absolute rounded-[15px]`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></motion.div>
          
          {favoriteProjects &&
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`right-[0px] -top-7 z-10 absolute text-main-black px-2 rounded-full backdrop:blur-xl bg-trans-white flex text-sm items-center gap-1 pt-0.5`}
          >
            <div className="pb-0.5">
            <Image 
              width={10}
              height={10}
              src="/svgs/fave.svg"
              alt="favorite icon"
            >
            </Image>
            </div>
            <p>
            {favoriteProjects?.faves}
            </p>
            
          </motion.div>
          }
          <motion.div
            variants={background}
            className={`w-[106px] h-[73px] opacity-70 absolute top-[9px] rounded-[15px]`}
            style={{ backgroundColor: `#${rgbHex(color)}` }}
          ></motion.div>
        </motion.div>
      </div>
      <div className="flex justify-center">
          <div className="flex gap-2 items-center text-sm">
            <div>
              <Image width={21} height={21} src={logoPath} alt={altText} />
            </div>
            { name.length > 12
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
    </motion.div>
  );
}
