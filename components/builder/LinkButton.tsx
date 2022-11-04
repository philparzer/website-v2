/*
WHAT:
buttton for projects that links to live version of current project
*/

import Link from "next/link";

type Props = {};

export default function LinkButton({}: Props) {
  return (
    <Link
      href="/" //TODO: link
      className="flex justify-center items-center pl-4 pr-5 py-1  rounded-full bg-trans-white gap-2 group hover:text-white hover:bg-main-black"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_393_14)">
          <path
            d="M13.7006 1.30082C15.4325 3.03332 15.4325 5.84395 13.7006 7.57707L11.3006 9.97645L9.97501 8.6502L12.3744 6.2502C13.3738 5.25145 13.3738 3.62582 12.3738 2.62707C11.375 1.6277 9.74939 1.6277 8.75064 2.62645L6.35064 5.02582L5.02501 3.7002L7.42501 1.30082C9.15688 -0.432305 11.9669 -0.432305 13.7006 1.30082ZM8.64938 9.9752L6.24938 12.3746C5.25063 13.3746 3.62501 13.3739 2.62501 12.3746C1.62626 11.3758 1.62626 9.74957 2.62501 8.75145L5.02501 6.35144L3.69938 5.02582L1.29938 7.42582C-0.43249 9.15832 -0.433115 11.9683 1.29938 13.7014C3.03251 15.4339 5.84313 15.4346 7.57501 13.7014L9.97501 11.3014L8.64938 9.9752Z"
            className="fill-main-black group-hover:fill-white"
          />
        </g>
        <defs>
          <clipPath id="clip0_393_14">
            <rect width="15" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className="font-robotoFlex variable-semibold text-xl text-main-black group-hover:text-white">visit</div>
    </Link>
  );
}
