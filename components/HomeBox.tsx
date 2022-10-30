/*
WHAT:
Glassmorphic wrapper / main content box wrapper on index
*/
import CursorCustomizer from "./CursorCustomizer";
import ProjectLink from "./ProjectLink";
import FilterList from "./FilterList";
import { useState } from "react";
import { FilterOptions } from '../shared-ts/enums'

interface Props {
  projects: any;
  cookie: any;
}

export default function HomeBox({ projects, cookie }: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  const updateFilter = (option:FilterOptions) => {

  }

  return (
    <>
      <div className="relative lg:w-7/12 max-w-[895px] lg:h-[65%] rounded-[30px] card">
        {/*TODO: Add Noise PNG*/}
        <div className="absolute right-10 top-5">
          <CursorCustomizer cookie={cookie} />
        </div>
        <div className="flex h-full">
          <div className="w-[20%] border-r-2 border-trans-white pt-20">
            <FilterList 
              updateFilter={updateFilter}
            />
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
