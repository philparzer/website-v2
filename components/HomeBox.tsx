/*
WHAT:
Glassmorphic wrapper / main content box wrapper on index
*/
import CursorCustomizer from "./CursorCustomizer";
import ProjectLink from "./ProjectLink";
import { useState } from "react";

interface Props {
  projects: any;
  cookie: any;
}

enum FilterOptions {
  "Recents",
  "Favorites",
  "Dev",
  "Design",
  "3D",
  "Language",
  "Misc",
  "About",
}

export default function HomeBox({ projects, cookie }: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  return (
    <>
      <div className="relative lg:w-7/12 max-w-[895px] lg:h-[65%] rounded-[30px] card">
        {/*TODO: Add Noise PNG*/}
        <div className="absolute right-10 top-5">
          <CursorCustomizer cookie={cookie} />
        </div>
        <div className="flex h-full">
          <div className="w-[20%] border-r-2 border-trans-white pt-20">
            {/*TODO: Filter Options*/}
            {/* <IndexBoxFilter /> */}
          </div>

          <div className="flex flex-wrap px-10 pt-20 gap-10">
            {projects.map((link: any, index: number) => (
              <ProjectLink
                key={index}
                url={link.data.url}
                color={link.data.color}
                name={link.name}
                altText={link.data.logoAltText}
                logoPath={link.data.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
