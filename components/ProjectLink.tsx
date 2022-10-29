/*
WHAT:

*/

import rgbHex from 'rgb-hex';
import Image from 'next/image'

interface Props {
    index: number,
    url: string,
    color: string,
    name: string,
    altText: string,
    logoPath: string
}

export default function ProjectLink({ index, url, color, name, altText, logoPath  }:Props) {
    return (
        <>
            <div>
                    <div className="w-[106px]">
                    <div className="relative h-[100px]">
                    <div className={`w-[106px] h-[73px] opacity-70 left-[9px] absolute rounded-[15px]`}
                        style={{backgroundColor: `#${rgbHex(color)}`}}
                    >
                    </div>
                    <div className={`w-[106px] h-[73px] opacity-70 absolute top-[9px] rounded-[15px]`}
                        style={{backgroundColor: `#${rgbHex(color)}`}}
                    >
                    </div>
                    </div>
                    </div>
                    <div className="flex justify-center">
                        <a key={index} href={url} >
                        <div className="flex gap-2">
                            <Image width={21} height={21} src={logoPath} alt={altText}/>
                            <div>{name}</div>
                        </div>
                        </a>
                    </div>
                </div>
        </>
    )
}