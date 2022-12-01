/* 
TODO:
*/

import { useMatches, KBarResults } from "kbar";
import { groupNameStyle } from "./kbarStyles";
import Image from 'next/image'

const svgIcons:any = {
  email: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>,
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
  github: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  imprint: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></svg>,
  gdpr: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill-opacity="0.2" d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z"/></svg>,
}



interface Props {}

export default function RenderResults({}: Props) {
  const { results }: any = useMatches();
  console.log(results);

  return (
    <div className="p-[30px] pr-0 pt-2 bg-white max-h-[70vh] md:max-h-[50vh] overflow-auto">
      <KBarResults
        items={results}
        onRender={({ item, active }:any) =>
          typeof item === "string" ? (
            <div style={groupNameStyle}>{item}</div>
          ) : (
            <div
              style={{
                paddingBottom: 5,
                paddingRight: 30,
                fontSize: "16px",
                color: active ? "black" : "#9CA3AF",
                fontStyle: active ? "600" : "400",
                zIndex: 100,
                fontFamily: "Roboto Flex",
                overflow: "hidden",
                cursor: "pointer"
              }}
            >
              <span
                style={{
                  transition: "all 0.5s ease-out",
                  paddingLeft: active ? 5 : 2,
                }}
                className="flex items-center gap-2 justify-between"
              >
                <span className="flex items-center gap-2">
                  {item.thumbnail ?
                    <span>
                      <Image 
                        width={18}
                        height={18}
                        alt={""}
                        src={item.thumbnail}
                      />
                    </span>
                  :
                    <>
                      {svgIcons[item.id]}
                    </>
                  }
                {item.name}
                </span>
                {active && (
                  <span className="bg-gray-200 p-0.5 px-2 text-sm rounded-[10px]">
                    go →
                  </span>
                )}
              </span>
            </div>
          )
        }
      />
      {results.length === 0 && (
        <div
          style={{
            background: "white",
            fontSize: "16px",
            zIndex: 100,
            fontFamily: "Roboto Flex",
            overflow: "hidden",
          }}
        >
          no results
        </div>
      )}
    </div>
  );
}
