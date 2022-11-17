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
    <div className="bg-white pb-10">
      <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <div
            style={{
              background: "white",
              padding: "30px",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "16px",
              color: active ? "black": "#9CA3AF",
              zIndex: 100,
              fontFamily: "Roboto Flex"
            }}
          >
            <span>{item.name} 2</span>
          </div>
        )
      }

      
    />
    {results.length === 0 && <div>hi</div>}
    </div>
  )

}