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
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className={`stroke-main-black fill-main-black`} viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>

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
