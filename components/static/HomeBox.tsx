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
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";

interface Props {
  projects: any;
  cookie: any;
  about: any;
  IAMStrings: any;
}

let projectCounter: number = 0;
let slicedSortedFavorites: string[];

export default function HomeBox({projects, cookie, about, IAMStrings}: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  const updateFilter = (option: number) => {
    setFilterOption(option);
    projectCounter = 0;
  };

  const { isLoading, isError, data } = useQuery("favorites", () =>
    axios.get("/api/get-favorites")
  );
  const favoritesArray = data?.data;

  if (!isLoading && !isError) {
    const sortedFavorites = [...favoritesArray].sort(
      (a: any, b: any) => b.faves - a.faves
    );
    slicedSortedFavorites = sortedFavorites.slice(0, 4);
  }

  return (
    <>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px]">
        <IAM IAMStrings={IAMStrings} />
      </div>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px] h-[70%] lg:h-[65%] lg:max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div
          className="absolute
         top-5 w-full flex justify-end"
        >
          {/* <CursorCustomizer cookie={cookie} /> TODO: uncomment when liveblocks */}
        </div>
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col justify-center border-b-2 lg:border-r-2 lg:border-b-0 border-trans-white lg:w-[20%]">
            <div className="h-[70%] filter-list-desktop text-white">
              <FilterList
                updateFilter={updateFilter}
                filterOption={filterOption}
              />
            </div>
            <div className="flex h-[58px] lg:h-full lg:pt-20 filter-select-desktop w-full px-5 lg:items-start items-center lg:justify-center">
              <FilterSelect
                updateFilter={updateFilter}
                filterOption={filterOption}
              />
            </div>
          </div>

          <div className="flex flex-col w-full px-5 lg:px-10 py-10 lg:py-20 text-white lg:w-[80%] overflow-auto">
            <ul className="flex flex-row flex-wrap gap-7 lg:gap-10">
              {projects.map((link: any) => {
                let linkTags = link.data.category.toLowerCase();
                let linkIsRecent = link.data.isRecent;

                if (!isLoading && !isError) {
                  let slicedSortedFavoriteLookups = slicedSortedFavorites.map(
                    (item: any) => item.project
                  );

                  if (filterOption === FilterOptions.Favorites) {
                    if (
                      slicedSortedFavoriteLookups.includes(
                        link.data.databaseLookup
                      )
                    ) {
                      projectCounter++;

                      return (
                        <motion.li
                          layout
                          key={link.name}
                          animate={{ scale: 1, opacity: 1 }}
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            delay: 0,
                          }}
                        >
                          <ProjectLink
                            url={link.data.link.value.data.url}
                            color={link.data.color}
                            name={link.name}
                            altText={link.data.logoAltText}
                            logoPath={link.data.logo}
                          />
                        </motion.li>
                      );
                    }
                  }
                }

                if (filterOption === FilterOptions.Recents) {
                  if (linkIsRecent) {
                    projectCounter++;
                    return (
                      <motion.li
                        layout
                        key={link.name}
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        transition={{ type: "spring", bounce: 0.25, delay: 0 }}
                      >
                        <ProjectLink
                          url={link.data.link.value.data.url}
                          color={link.data.color}
                          name={link.name}
                          altText={link.data.logoAltText}
                          logoPath={link.data.logo}
                        />
                      </motion.li>
                    );
                  }
                } else if (
                  linkTags.includes(FilterOptions[filterOption].toLowerCase())
                ) {
                  projectCounter++;
                  if (projectCounter > 0) {
                    return (
                      <motion.li
                        layout
                        key={link.name}
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        transition={{ type: "spring", bounce: 0.25, delay: 0 }}
                      >
                        <ProjectLink
                          url={link.data.link.value.data.url}
                          color={link.data.color}
                          name={link.name}
                          altText={link.data.logoAltText}
                          logoPath={link.data.logo}
                        />
                      </motion.li>
                    );
                  }
                }
              })}

              {/*Render something if no projects for current selection*/}
              {projectCounter === 0 &&
                (filterOption === FilterOptions.About ? (
                  <>{about}</>
                ) : isLoading ? (
                  <>loading...</>
                ) : isError ? (
                  <>hmm something went wrong</>
                ) : (
                  <>nothing to see here</>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
