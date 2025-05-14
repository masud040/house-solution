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
  const origin = request.headers.get("origin") ?? "";

  // Strip locale

  const isPreflight = request.method === "OPTIONS";
  const isAllowedOrigin = allowedOrigins.includes(origin);

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
  // Locale redirect
  const url = new URL(request.url);
  const pathname = url.pathname;
  // Strip locale from pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, "") || "/";

  // Locale redirect
  const localeMissing = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  );
  if (localeMissing) {
    const locale = getLocale(request);
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    redirectUrl.search = url?.searchParams.toString();
    return NextResponse.redirect(redirectUrl);
  }
  // Auth check for protected routes
  const isProtectedRoute = protectedRoutes.includes(pathnameWithoutLocale);
  // Auth check
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Session", session);
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }
  // Add CORS headers to every response
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};
