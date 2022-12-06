/*
WHAT:
I am Philipp text component
*/

import Image from "next/image"
import { useEffect, useState } from "react"
import { localizedStaticContent } from "../../localization/dict";

interface Props {
    IAMStrings: any;
    locale: string;
}

export default function IAM({ IAMStrings, locale }:Props) {

    const [firstRender, setFirstRender] = useState<boolean>(false);

    useEffect(() => {
        setFirstRender(true)
    }, [])

    console.log(IAMStrings)

    return (
        <>
            <div className="text-3xl text-white pb-6 lg:pb-8 font-roboto px-4 lg:px-10 flex items-center ">
                <div><Image src="/svgs/Philipp_Parzer_Logo_Warm.svg" alt="test" width={50} height={50} priority={true}></Image></div>
                <h1 className="px-4 animation-prefix">
                    {firstRender === true
                    ? 
                        <>
                            <p className="text-white opacity-60 px-2">{localizedStaticContent.IAM[locale]}</p>
                            <div className="animation-subject text-white relative">
                                
                                {IAMStrings.map((item:any, index:number) => 
                                    <div key={index}>
                                      {locale === "en" ? item.data.string.Default : item.data.string[locale]}.</div>
                                )}
                            </div>
                        </>
                        
                    : 
                        <span>I'm Philipp</span>
                    }
                </h1>
            </div>
        </>
    )
}