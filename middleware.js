import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";

let defaultLocale = "en";
let locales = ["en", "bn"];
const protectedRoutes = [
  "/wishlist",
  "/cart",
  "/add",
  "/edit",
  "/checkout",
  "/orders",
  "/profile",
];

const publicRoutes = ["/login", "/signup", "/shop", "/about-us", "/contact-us"];
const allowedOrigins = [
  "https://sokher-corner.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const origin = request.headers.get("origin") ?? "";

  // Strip locale
  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "") || "/";
  const isProtectedRoute = protectedRoutes.includes(pathnameWithoutLocale);
  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);

  const isPreflight = request.method === "OPTIONS";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  let redirectUrl = request.nextUrl;
  // CORS Preflight
  if (isPreflight) {
    return NextResponse.json(
      {},
      {
        headers: {
          ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
          ...corsOptions,
        },
      }
    );
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Locale redirect
  const localeMissing = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  );
  if (localeMissing) {
    const locale = getLocale(request);
    redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    redirectUrl.search = searchParams.toString();
    return NextResponse.redirect(redirectUrl);
  }

  // Auth check
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect unauthenticated user from protected route
  if (isProtectedRoute && !session) {
    const callbackUrl = encodeURIComponent(pathname);
    redirectUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Prevent logged in user from seeing login/register
  if (
    session?.email &&
    (pathnameWithoutLocale === "/login" ||
      pathnameWithoutLocale === "/register")
  ) {
    redirectUrl = new URL("/", request.nextUrl);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};
