/* 
TODO:
*/

import { useMatches, KBarResults } from "kbar"
import { groupNameStyle } from "./kbarStyles"

interface Props {

}

export default function RenderResults({}: Props) { 

  const { results }:any = useMatches();
  console.log(results)

  return(
    <div className="p-[30px] pt-2 bg-white max-h-[50vh] overflow-auto">
      <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <div
            style={{
              paddingBottom: 5,
              fontSize: "16px",
              color: active ? "black": "#9CA3AF",
              fontStyle: active ? "600" : "400",
              zIndex: 100,
              fontFamily: "Roboto Flex",
              overflow: "scroll",
            }}
          >
            <span
              style={{
                transition: "all 0.5s ease-out",
                paddingLeft: active ? 5 : 2,
              }}
              className="flex items-center gap-2 justify-between"
            >{item.name} {active &&
              <span className="bg-gray-200 p-0.5 px-2 text-sm rounded-[10px]">go →</span>
            }</span>
          </div>
        )
      }

      
    />
    {results.length === 0 && <div
            style={{
              background: "white",
              fontSize: "16px",
              zIndex: 100,
              fontFamily: "Roboto Flex"
            }}
          >no results</div>}
    </div>
  )

}