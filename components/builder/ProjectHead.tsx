/*
WHAT:

*/

import Image from "next/image";
import FaveButton from "./FaveButton";
import LinkButton from "./LinkButton";

export default function ProjectHead(props: any) {
  return (
    <div className="flex">
      <div className="flex items-center justify-center gap-5">
        <div className="w-[45px] h-[45px] bg-white rounded-full"></div>
        {/* <Image src="/" alt="TODO:" width={45} height={45} /> */}{/* TODO: uncomment and delete white rect */}
        <h1 className="font-robotoFlex variable-semibold text-3xl text-white">
          Zebras
        </h1>
        
      </div>

      <div className="flex grow justify-between">
        <div className="flex justify-center items-center gap-1 pt-1 px-5">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="5" fill="#F2C12B" />
            </svg>
            <p className="font-robotoFlex variable-semibold text-sm text-main-black">on hold</p>
          </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <LinkButton />
        <FaveButton />
      </div>
    </div>
  );
}
