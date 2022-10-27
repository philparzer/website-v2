// middleware.ts
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { basename } from "path";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  console.log(url)
  console.log(viewport)
  if (viewport === "mobile" && url.pathname !== "/singleplayer") {
    return NextResponse.redirect(new URL("/singleplayer", url));
  }

  else if (viewport !== "mobile" && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/", url.origin))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/singleplayer"]
};
