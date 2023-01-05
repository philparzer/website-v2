import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const font: any = fetch(new URL('../../public/fonts/Roboto-Medium.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const titleLookup: any = {
  default: ["Hi 👋", "I'm", "Philipp"],
  de: ["Hi 👋", "ich bin", "Philipp"],
  ru: ["Прив 👋", "Я", "Филилпп"]

}

export default async function handler (req: NextRequest) {

  const fontData = await font;
  const { searchParams } = new URL(req.url);

    // ?title=<title>
    const locale: any = searchParams.get('locale');


  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          color: "white",
          background: "linear-gradient(-15deg, #f5bc54, #ed4167, #f5bc54)",
          backgroundSize: "400% 400%",
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          padding: 80,
          fontFamily: "Roboto Flex"
        }}
      > 
        <div style={{display: "flex", paddingRight: 40}}>
        <img style={{width: 200, height:200}} src="https://website-v2-umber.vercel.app/_next/image?url=%2Fsvgs%2FPhilipp_Parzer_Logo_Warm.svg&w=128&q=75" />
        </div>
        <div style={{display: "flex", flexDirection: "column"}}><span><span style={{color: "white", paddingRight: 20,}}>{" "}{titleLookup[locale][0]}</span><span style={{color:"rgba(255, 255, 255, 0.4)"}}>{titleLookup[locale][1]}<span style={{color: "white", paddingLeft: 20,}}>{" "}{titleLookup[locale][2]}</span></span></span>
        </div>
        
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Roboto Flex',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}