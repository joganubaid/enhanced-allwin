import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const localeCookie = request.cookies.get("locale");
  const locale = localeCookie?.value || "en";

  if (localeCookie) {
    response.cookies.set("locale", localeCookie.value);
  }

  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};