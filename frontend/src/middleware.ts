import { type NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let response = NextResponse.next();

  const nextUrl = req.nextUrl;

  if (nextUrl.pathname === "/") {
    const token = nextUrl.searchParams.get("token");
    if (token) {
      nextUrl.searchParams.delete("token");
      response = NextResponse.redirect(nextUrl);
      response.cookies.set("token", token, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
  }

  const t = req.cookies.get("token") ?? response.cookies.get("token");
  const isAuthRoutes = ["/login", "/callback"].includes(nextUrl.pathname);

  if (!t && !isAuthRoutes) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
