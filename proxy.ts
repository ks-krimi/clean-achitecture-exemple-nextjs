import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isProtected = PROTECTED_ROUTES.some(
    (path) =>
      req.nextUrl.pathname === path ||
      req.nextUrl.pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const isAuthPage = AUTH_PAGES.includes(req.nextUrl.pathname);
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/sign-in", "/sign-up"] };
