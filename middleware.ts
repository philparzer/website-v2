// middleware.ts
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

//middleware reroutes mobile users so to not use liveblocks
export function middleware(request: NextRequest) {
  //TODO: uncomment when liveblocks
  // const url = request.nextUrl;
  // const { device } = userAgent(request);
  // const viewport = device.type === "mobile" ? "mobile" : "desktop";

  // if (viewport === "mobile" && url.pathname !== "/singleplayer") {
  //   return NextResponse.redirect(new URL("/singleplayer", url));
  // }

  // else if (viewport !== "mobile" && url.pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", url.origin))
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/singleplayer"]
};
