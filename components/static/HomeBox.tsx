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
import KBarButton from "../kbar/KBarButton";
import LanguageSelect from "./LanguageSelect";

interface Props {
  projects: any;
  cookie: any;
  about: any;
  IAMStrings: any;
  locale: string;
}

interface DatabaseProject {
  project: string;
  faves: number;
}

let projectCounter: number = 0;
let slicedSortedFavorites: any[];
let likeSortedProjects: any = [];

export default function HomeBox({
  projects,
  cookie,
  about,
  IAMStrings,
  locale,
}: Props) {
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.Recents
  );

  const [projectsState, setProjects] = useState<any>(projects);

  const updateFilter = (option: number) => {
    setFilterOption(option);
    projectCounter = 0;
    if (option === FilterOptions.Favorites) {
      setProjects(likeSortedProjects);
    } else {
      setProjects(projects);
    }
  };

  const { isLoading, isError, data } = useQuery("favorites", () =>
    axios.get("/api/get-favorites")
  );
  const favoritesArray = data?.data;

  if (!isLoading && !isError) {
    const sortedFavorites: DatabaseProject[] = [...favoritesArray].sort(
      (a: DatabaseProject, b: DatabaseProject) => b.faves - a.faves
    );
    //sorting and slicing favorite projects
    slicedSortedFavorites = sortedFavorites.slice(0, 3);
    likeSortedProjects = projects.filter(
      (project: any) =>
        slicedSortedFavorites.filter(
          (favorite: any) => favorite.project === project.data.databaseLookup
        ).length !== 0
    );
    likeSortedProjects.sort(
      (a: any, b: any) =>
        slicedSortedFavorites.indexOf(
          slicedSortedFavorites.find(
            (element: any) => element.project === a.data.databaseLookup
          )
        ) -
        slicedSortedFavorites.indexOf(
          slicedSortedFavorites.find(
            (element: any) => element.project === b.data.databaseLookup
          )
        )
    );
  }

  return (
    <>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px]">
        <IAM IAMStrings={IAMStrings} locale={locale} />
      </div>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px] h-[70%] lg:h-[65%] lg:max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div className="absolute top-5 right-7 w-full flex gap-4 justify-end items-center">
          <LanguageSelect locale={locale} />
          <CursorCustomizer cookie={cookie} locale={locale} />
          <KBarButton locale={locale} />
        </div>
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col justify-center border-b-2 lg:border-r-2 lg:border-b-0 border-trans-white lg:w-[20%]">
            <div className="h-[70%] filter-list-desktop text-white">
              <FilterList
                locale={locale}
                updateFilter={updateFilter}
                filterOption={filterOption}
              />
            </div>
            <div className="flex h-[58px] lg:h-full lg:pt-20 filter-select-desktop w-full px-5 lg:items-start items-center lg:justify-center">
              <FilterSelect
                locale={locale}
                updateFilter={updateFilter}
                filterOption={filterOption}
              />
            </div>
          </div>

          <div className="flex flex-col w-full px-5 lg:px-10 py-10 lg:py-20 text-white lg:w-[80%] overflow-auto">
            <ul className="flex flex-row flex-wrap gap-7 lg:gap-10">
              {projectsState.map((link: any) => {
                let linkCategory1 = link.data.category.toLowerCase();
                let linkTags = [linkCategory1];
                if (link.data.category2) {
                  //if project has more than one category
                  let linkCategory2 = link.data.category2.toLowerCase();
                  linkTags.push(linkCategory2);
                }

                let linkIsRecent = link.data.isRecent;

                //if all is selected
                if (filterOption === FilterOptions.All) {
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

                //if favorites is selected
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
                          exit={{ scale: 0.8, opacity: 0.8 }}
                        >
                          <ProjectLink
                            url={link.data.link.value.data.url}
                            color={link.data.color}
                            name={link.name}
                            altText={link.data.logoAltText}
                            logoPath={link.data.logo}
                            favoriteProjects={slicedSortedFavorites.find(
                              (element) =>
                                element.project === link.data.databaseLookup
                            )}
                          />
                        </motion.li>
                      );
                    }
                  }
                }

                //if recents is selected
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
                }

                //if other option in enum is selected
                else if (
                  linkTags.includes(FilterOptions[filterOption].toLowerCase())
                ) {
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
              })}

              {/*Render something if no projects for current selection*/}
              {projectCounter === 0 &&
                (filterOption === FilterOptions.About ? (
                  <>{about}</>
                ) : isLoading ? ( //favorites is selected but query has not completed
                  <>loading...</>
                ) : isError ? ( //favorites is selected but query error
                  <>hmm something went wrong</>
                ) : (
                  //no items for current selection
                  <>nothing to see here</>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
