/*
WHAT:
select input to filter projects on mobile or desktop index if screen height is less than 570px
*/

import { FilterOptions } from "../../shared-ts/enums"
import { enumToValueArray } from "../../shared-ts/utils"

interface Props {
    updateFilter: (option: number) => void,
    filterOption: FilterOptions
}

const filterOptions:string[] = enumToValueArray(Object.values(FilterOptions));


export default function FilterSelect({ updateFilter, filterOption }:Props) {

    const onFilterSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        updateFilter(parseInt(e.target.value));
    }

    return (
        <div className="bg-main-black text-white rounded-[30px] px-4 py-3 mt-2 mb-1 flex items-center" >
           <select className="bg-main-black dark:placeholder-white focus:outline-none" value={filterOption} onChange={(e) => onFilterSelectChange(e)}>
                {filterOptions.map((option, index) => 
                    <option className="bg-main-black" key={index} value={index}>{option}</option>
                )}
            </select>
        </div>
    )
}