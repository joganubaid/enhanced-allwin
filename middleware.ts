import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Validate the locale cookie against the known set; never trust the raw value.
  const raw = request.cookies.get("locale")?.value;
  const locale = raw === "ar" ? "ar" : "en";

  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};