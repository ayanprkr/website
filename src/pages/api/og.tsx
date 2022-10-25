import { ImageResponse } from "@vercel/og";
import type { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'experimental-edge'
};

export default async (req: NextRequest, res: NextResponse) => {
  const font = fetch(new URL('../../../public/fonts/Lato-Bold.ttf', import.meta.url))
    .then((res) => res.arrayBuffer());

  try {
    const fontData = await font;
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'A 16 year old programming enthusiast and a digital artist!';

    return new ImageResponse(
      (
        <div tw="bg-black h-full w-full flex flex-col items-center justify-center">
          <div tw="flex flex-col items-center justify-center">
            <img tw="shadow-lg shadow-purple-500/50 h-60 w-60 rounded-lg" src="https://avatars.githubusercontent.com/u/38457291?v=4" alt="face" />
            <h1 tw="text-center text-neutral-300 text-2xl font-bold">ayxn.xyz</h1>
            <h2 tw="text-center text-neutral-200 text-4xl">{title}</h2>
          </div>
        </div>
      ), 
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Lato",
            data: fontData,
            style: "normal"
          }
        ]
      }
    )
  } catch (e) {
    
  }
};