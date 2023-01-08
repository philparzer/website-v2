import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { ProjectStatus } from "../../shared-ts/enums";
import { localizedStaticContent } from "../../localization/dict";

export const config = {
  runtime: "experimental-edge",
};

const url: any = new URL(
  "../../public/fonts/Roboto-Medium.ttf",
  import.meta.url
);

const font: any = fetch(url).then((res: any) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const { searchParams } = new URL(req.url);
  const locale: any = searchParams.get("locale");
  const lookup: any = searchParams.get("lookup");
  const name: any = searchParams.get("name");
  //   const likes: any = searchParams.get("likes"); TODO:
  const status: any = searchParams.get("status");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          color: "white",
          background: "linear-gradient(-15deg, #f5bc54, #ed4167, #f5bc54)",
          backgroundSize: "400% 400%",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          padding: 150,
          fontFamily: "Roboto Flex",
        }}
      >
        <div style={{ display: "flex", paddingRight: 40 }}>
          <img
            style={{ width: 200, height: 200 }}
            src={`https://raw.githubusercontent.com/philparzer/website-v2-assets/master/og-image-icons/${lookup}.png`}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            
            {name}
          </div>
            <span style={{ fontSize: 30, color: "#483434", display: "flex", alignItems: "center" }}>
              <svg
                className="animate-pulse"
                style={{marginRight: 10, marginTop: 5}}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  fill={`
                ${
                  status === ProjectStatus[ProjectStatus["on hold"]]
                    ? "#F2C12B"
                    : status === ProjectStatus[ProjectStatus["completed"]]
                    ? "#47F22B"
                    : status === ProjectStatus[ProjectStatus["concept"]]
                    ? "#2BAAF2"
                    : ""
                }`}
                />
              </svg>

              {localizedStaticContent[status][locale]}
            </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Roboto Flex",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
