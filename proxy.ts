import { NextRequest, NextResponse } from "next/server";

import { container } from "@/src/di/container";
import { AccessTokenExpiredError } from "@infrastructure/auth/errors";

const PROTECTED_ROUTES = ["/"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const { tokenService } = container.cradle;

  const access_token = req.cookies.get("access_token")?.value;
  const refresh_token = req.cookies.get("refresh_token")?.value;

  const getValidAccessToken = (): string | null => {
    if (access_token) {
      try {
        tokenService.verifyAccessToken(access_token);
        return access_token;
      } catch (error: unknown) {
        if (error instanceof AccessTokenExpiredError) {
          return tokenService.refreshAccessToken(refresh_token);
        }
        return null;
      }
    }
    return tokenService.refreshAccessToken(refresh_token);
  };

  const validAccessToken = getValidAccessToken();
  const hasSession = !!validAccessToken;

  if (AUTH_PAGES.includes(req.nextUrl.pathname) && hasSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isProtected = PROTECTED_ROUTES.some(
    (path) =>
      req.nextUrl.pathname === path ||
      req.nextUrl.pathname.startsWith(path + "/")
  );

  if (isProtected && !hasSession) {
    const res = NextResponse.redirect(new URL("/sign-in", req.url));
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");
    return res;
  }

  if (validAccessToken && validAccessToken !== access_token) {
    const res = NextResponse.next();
    res.cookies.set("access_token", validAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
    });
    return res;
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/sign-in", "/sign-up"] };
