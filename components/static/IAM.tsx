/*
WHAT:
I am Philipp text component
*/

import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
    IAMStrings: any
}

export default function IAM({ IAMStrings }:Props) {

    const [firstRender, setFirstRender] = useState<boolean>(false);

    useEffect(() => {
        setFirstRender(true)
    }, [])

    return (
        <>
            <div className="text-3xl text-white pb-6 lg:pb-8 font-roboto px-4 lg:px-10 flex items-center ">
                <div><Image src="/svgs/Philipp_Parzer_Logo_Warm.svg" alt="test" width={50} height={50}></Image></div>
                <h1 className="px-4 animation-prefix">
                    {firstRender === true
                    ? 
                        <>
                            <p className="text-white opacity-60 px-2">I'm</p>
                            <div className="animation-subject text-white relative">
                                
                                {IAMStrings.map((item:any) => 
                                    <div>{item.data.string}</div>
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