import { FilterOptions } from "../../shared-ts/enums"
import { enumToKeyArray } from "../../shared-ts/utils"
import { useState, useEffect } from "react"

interface Props {
   updateFilter: (option: number) => void, //onchange handler that is passed down from homebox
   filterOption: FilterOptions //currently selected filter option
}

const filterOptions = enumToKeyArray(Object.values(FilterOptions));


export default function FilterList({ updateFilter, filterOption }:Props) {
    //TODO: style
    
    const onFilterButtonClick = (option: number) => {
        updateFilter(option);
    }



    return (
            <div className="flex justify-center h-full">
            <div className="flex flex-col gap-4">
            
            {filterOptions.map((option:number, index:number) =>
                <div key={index} className={`${FilterOptions[option] === FilterOptions[FilterOptions.About] && "grow flex flex-col items-start justify-end"}`}>
                    <button 
                    onClick={() => onFilterButtonClick(option)} 
                    className={`mx-3 px-4 py-0.5 rounded-full hover:bg-trans-white ${index === filterOption  && "bg-main-black hover:bg-main-black"}`}
                    >{FilterOptions[option]}</button>
                </div>
            )}
            </div>
            </div>  
    )
}
