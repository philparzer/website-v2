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
import ProjectSearch from "./ProjectSearch"

interface Props {
  projects: any;
  cookie: any;
  about: any;
}

let projectCounter:number = 0;

export default function HomeBox({ projects, cookie, about }: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateFilter = (option: number) => {
    setFilterOption(option);
    projectCounter = 0;
  };

  const updateFilterMode = (status: boolean) => {
    setSearchEnabled(status);
  }

  const updateSearchInput = (input: string) => {
    setSearchTerm(input);
  }

  return (
    <>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px]">
        <IAM />
      </div>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px] h-[70%] lg:h-[65%] lg:max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div className="absolute p+ä
         top-5 w-full flex justify-end">
          {/* <CursorCustomizer cookie={cookie} /> TODO: uncomment when liveblocks */}
          <ProjectSearch updateFilterMode={updateFilterMode} updateSearchInput={updateSearchInput} searchEnabled={searchEnabled} />
        </div>
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col justify-center border-b-2 lg:border-r-2 lg:border-b-0 border-trans-white lg:w-[20%]">
            <div className="h-[70%] filter-list-desktop text-white">
            {searchEnabled === false && 
              <FilterList updateFilter={updateFilter} filterOption={filterOption}/>
            } 
            </div>
            <div className="flex h-[58px] lg:h-full lg:pt-20 filter-select-desktop w-full px-5 lg:items-start items-center lg:justify-center">
            {searchEnabled === false && 
              <FilterSelect updateFilter={updateFilter} filterOption={filterOption} />
            }
            </div>
          </div>

          <div className="flex flex-col w-full px-5 lg:px-10 py-10 lg:py-20 text-white lg:w-[80%] overflow-auto">
            <div className="flex flex-row flex-wrap gap-7 lg:gap-10">
              <>
              {
                  projects.map((link: any, index: number) => {
                    let linkTags = link.data.category.map((project: string) =>
                      project.toLowerCase()
                    );

                    if (searchEnabled === true) {
                      let projectNameLower = link.name.toLowerCase();
                      if (projectNameLower.includes(searchTerm)) {
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
                    }

                    else if (linkTags.includes(FilterOptions[filterOption].toLowerCase())) {
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
                  ? <>{about}</>
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
