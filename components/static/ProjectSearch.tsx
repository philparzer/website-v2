/*
WHAT:
search bar to filter projects via text input in homebox
*/

import React, { useState, useRef, useEffect } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick"

interface Props {
    updateFilterMode: (status:boolean) => void,
    updateSearchInput: (input:string) => void,
    searchEnabled: boolean
}

export default function ProjectSearch({ updateFilterMode, updateSearchInput, searchEnabled }:Props) {
   
    const closeSearch = () => {
        updateFilterMode(false);
    };
   
    const ref = useOutsideClick(closeSearch);

    const inputEl = useRef<HTMLInputElement>(null)

   

    const onSearchButtonClick = (value:boolean) => {
        updateFilterMode(!value);
    }

    const onInput = (input:string) => {
        let sanitizedInput = input.toLowerCase().trim();
        updateSearchInput(sanitizedInput);
    }

    useEffect(() => {
        if (searchEnabled === true) {
            inputEl.current!.focus();
        }
    }, [searchEnabled])

    return (
        <>
            <div className="flex" ref={ref}>
                {searchEnabled && <div className="">
                    <input className="focus:border-none focus:outline-none px-2" ref={inputEl} placeholder="looking for something?" onChange={(e) => onInput(e.target.value)}></input>
                </div>}
                <button className="px-1" onClick={() => onSearchButtonClick(searchEnabled)}>{searchEnabled ? "disable" : "enable"} search</button>
            </div>
            
        </>
    )
}