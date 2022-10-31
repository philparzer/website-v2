/*
WHAT:
select input to filter projects on mobile or desktop index if screen height is less than 570px
*/

import { FilterOptions } from "../../shared-ts/enums"
import { enumToValueArray } from "../../shared-ts/utils"

interface Props {
    updateFilter: (option: number) => void
}

const filterOptions:string[] = enumToValueArray(Object.values(FilterOptions));


export default function FilterSelect({ updateFilter }:Props) {

    const onFilterSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        updateFilter(parseInt(e.target.value));
    }

    return (
        <div >
           <select className="bg-transparent" onChange={(e) => onFilterSelectChange(e)}>
                {filterOptions.map((option, index) => 
                    <option className="" key={index} value={index}>{option}</option>
                )}
            </select>
        </div>
    )
}