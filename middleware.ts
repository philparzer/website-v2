// middleware.ts
import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  if (viewport === "mobile") {
    return NextResponse.redirect(new URL("/singleplayer", url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
