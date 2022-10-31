/*
WHAT:
Glassmorphic wrapper / main content box wrapper on index
*/
import CursorCustomizer from "./CursorCustomizer";
import ProjectLink from "./ProjectLink";
import FilterList from "./FilterList";
import { useState } from "react";
import { FilterOptions } from "../../shared-ts/enums";
import FilterSelect from "./FilterSelect";
import IAM from "./IAM";

interface Props {
  projects: any;
  cookie: any;
}

let projectCounter:number = 0;

export default function HomeBox({ projects, cookie }: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  const updateFilter = (option: number) => {
    setFilterOption(option);
    projectCounter = 0;
  };

  return (
    <>
      <div className="relative lg:w-7/12 max-w-[895px]">
        <IAM />
      </div>
      <div className="relative lg:w-7/12 max-w-[895px] lg:h-[65%] max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div className="absolute right-10 top-5">
          {/* <CursorCustomizer cookie={cookie} /> TODO: uncomment to enable liveblocks */}
        </div>
        <div className="flex flex-row h-full">
          <div className="flex flex-col justify-center border-r-2 border-trans-white w-[20%]">
            <div className="h-[70%] filter-list-desktop text-white">
              <FilterList updateFilter={updateFilter} />
            </div>
            <div className="h-[70%] filter-select-desktop">
              <FilterSelect updateFilter={updateFilter} />
            </div>
          </div>

          <div className="flex flex-col px-10 py-20 text-white w-[80%] overflow-auto">
            <div className="flex flex-row flex-wrap gap-10">
              <>
              {
                  projects.map((link: any, index: number) => {
                    let linkTags = link.data.category.map((project: string) =>
                      project.toLowerCase()
                    );
                    if (linkTags.includes(FilterOptions[filterOption].toLowerCase())) {
                      projectCounter++;
                      if (projectCounter > 0) {
                        return (
                          <ProjectLink
                            key={index}
                            url={link.data.link.value.data.url}
                            color={link.data.color}
                            name={link.name}
                            altText={link.data.logoAltText}
                            logoPath={link.data.logo}
                          />
                        );
                      }
                    }

                  })
                }
                {/*Render something if no projects for current selection*/}
                {projectCounter === 0 && (
                  filterOption === FilterOptions.About 
                  ? <>Todo About</>
                  : <>hmmm</> )
                }
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
