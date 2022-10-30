/*
WHAT:
list to filter projects on desktop index
*/

import { FilterOptions } from "../shared-ts/enums"
import { enumToKeyArray } from "../shared-ts/utils"
import { useState } from "react"

interface Props {
   updateFilter: (option: number) => void
}

const filterOptions = enumToKeyArray(Object.values(FilterOptions));


export default function FilterList({ updateFilter }:Props) {
    //TODO: style
    const [activeFilter, setActiveFilter] = useState(FilterOptions.Recents) 
    
    const onFilterButtonClick = (option: number) => {
        updateFilter(option);
        setActiveFilter(option);
    }

    return (
            <div className="flex justify-center h-full">
            <div className="flex flex-col gap-4">
            
            {filterOptions.map((option:number, index:number) =>
                <div key={index} className={`${FilterOptions[option] === FilterOptions[FilterOptions.About] && "grow flex flex-col items-start justify-end"}`}>
                    <button 
                    onClick={() => onFilterButtonClick(option)} 
                    className={`mx-3 px-2 rounded-full hover:bg-trans-white ${activeFilter === option  && "bg-main-black hover:bg-main-black"}`}
                    >{FilterOptions[option]}</button>
                </div>
            )}
            </div>
            </div>  
    )
}