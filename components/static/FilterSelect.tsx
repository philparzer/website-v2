/*
WHAT:
select input to filter projects on mobile or desktop index if screen height is less than 570px
*/

import { localizedFilterOptions } from "../../localization/dict";
import { FilterOptions } from "../../shared-ts/enums"
import { enumToValueArray } from "../../shared-ts/utils"

interface Props {
    updateFilter: (option: number) => void, //onchange handler that is passed down from homebox
    filterOption: FilterOptions //currently selected filter option
    locale: string
}

const filterOptions:string[] = enumToValueArray(Object.values(FilterOptions));


export default function FilterSelect({ updateFilter, filterOption, locale }:Props) {

    const onFilterSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter(parseInt(e.target.value));
    }

    return (
        <div className=" bg-main-black text-white rounded-full px-3 lg:py-1 mt-2 mb-1 flex h-[33px] lg:items-center relative z-20" >
           <select className="bg-main-black dark:placeholder-white focus:outline-none" value={filterOption} onChange={(e) => onFilterSelectChange(e)}>
              
              
                { locale === "en" ? filterOptions.map((option, index) => 
                    <option className="bg-main-black" key={index} value={index}>{option}</option>
                )
                :
                filterOptions.map((option, index) => 
                <option className="bg-main-black" key={index} value={index}>{localizedFilterOptions[option][locale]}</option>)
               }

            </select>
        </div>
    )
}