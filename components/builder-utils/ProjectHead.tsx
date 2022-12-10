/*
WHAT:
Project Head section featuring link and like button + logo
*/

import Image from "next/image";
import FaveButton from "./FaveButton";
import LinkButton from "./LinkButton";
import { ProjectStatus } from "../../shared-ts/enums";
import BackButton from "../static/BackButton";
import KBarButton from "../kbar/KBarButton"
import LanguageSelect from "../static/LanguageSelect";
import { localizedStaticContent } from "../../localization/dict"

interface Props {
  title: string;
  logoPath: string;
  externalLink: string;
  logoAltText: string;
  databaseLookup: string;
  status: string;
  locale: string;
}

export default function ProjectHead({locale, title, logoPath, externalLink, logoAltText, databaseLookup, status}: Props) {
  return (
    <div className="flex flex-wrap sticky top-0 rounded-b-[30px] z-20 backdrop-blur-md lg:mt-4 pt-4 pb-4 mb-4 px-4 card-width-main">
      <div className="flex items-center lg:w-auto lg:justify-center gap-4">
        <Image src={logoPath} alt={logoAltText} width={45} height={45} />
        <h1 className="font-robotoFlex variable-semibold text-2xl lg:mb-0 lg:text-3xl text-white">
          {title}
        </h1>
      </div>

      <div className="hidden lg:flex grow justify-between lg:w-auto">
        <div className="flex justify-center items-center gap-1 pt-1 lg:px-5">
            <svg className="animate-pulse"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="5" fill={`
                ${status === ProjectStatus[ProjectStatus["on hold"]] ? "#F2C12B"
                : status === ProjectStatus[ProjectStatus["completed"]] ? "#47F22B"
                : status === ProjectStatus[ProjectStatus["concept"]] ? "#2BAAF2" 
                : ""
              }`
              } />
            </svg>
            <p className="font-robotoFlex variable-semibold text-sm text-main-black">{localizedStaticContent[status][locale]}</p>
          </div>
      </div>
      <div className="flex ml-[60px] mt-1 lg:m-0 gap-4 lg:justify-center items-center w-full lg:w-auto">
        {externalLink !== "" && 
        <LinkButton 
          externalLink={externalLink}
          locale={locale}
        />
        }
        <FaveButton 
          databaseLookup={databaseLookup}
          locale={locale}
        />
        <LanguageSelect locale={locale}/>
        <div className="lg:pl-1">
        <KBarButton locale={locale}/>
        </div>
      </div>
    </div>
  );
}
