/*
WHAT:
I am Philipp text component
*/

import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {

}

export default function IAM({  }:Props) {

    const [firstRender, setFirstRender] = useState<boolean>(false); //SEO optimization?

    useEffect(() => {
        setFirstRender(true)
    }, [])

    return (
        <>
            <div className="text-3xl text-white pb-8 font-roboto px-4 lg:px-10 flex items-center ">
                <div><Image src="/svgs/Philipp_Parzer_Logo_Warm.svg" alt="test" width={50} height={50}></Image></div>
                <h1 className="px-4 animation-prefix">
                    {firstRender === true
                    ? 
                        <>
                            <p className="text-white opacity-60 px-2">I'm</p>
                            <div className="animation-subject">
                                <div className="text-white">Philipp</div>
                                <div className="text-white">ddd</div>
                                <div className="text-white">erwer</div>
                                <div className="text-white">adfadf</div>
                                <div className="text-white">adfadf</div> {/*TODO: map over CMS? array*/}
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