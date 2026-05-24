import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "fr", "it"];

export function middleware(request: NextRequest) {
  const first = request.nextUrl.pathname.split("/")[1] ?? "";
  const locale = locales.includes(first) ? first : "en";

  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
